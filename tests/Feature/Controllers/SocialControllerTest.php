<?php

namespace Tests\Feature\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class SocialControllerTest extends TestCase
{
    protected $socialite;

    protected function setUp(): void
    {
        parent::setUp();
        $this->socialite = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        Socialite::shouldReceive('driver')->with('keycloak')->andReturn($this->socialite);

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Project::truncate();
        User::truncate();
        Role::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    public function test_redirect_to_provider_redirects_to_keycloak()
    {
        $this->socialite->shouldReceive('with')->with(['prompt' => 'login'])->andReturnSelf();
        $this->socialite->shouldReceive('redirect')->andReturn(redirect('https://keycloak.example.com/login'));

        $response = $this->get(route('login', ['provider' => 'keycloak']));

        $response->assertRedirect('https://keycloak.example.com/login');
    }

    public function test_redirect_to_provider_aborts_for_unsupported_provider()
    {
        $response = $this->get(route('login', ['provider' => 'google']));

        $response->assertNotFound();
    }

    public function test_handle_provider_callback_creates_user_and_redirects()
    {
        $socialUser = new SocialiteUser();
        $socialUser->user = [
            'email' => 'test@example.com',
            'mapping_id' => 1,
            'first_name' => 'John',
            'family_name' => 'Doe',
            'middle_name' => 'Smith',
            'syncable_cohorts' => 'group1',
        ];

        $this->socialite->shouldReceive('user')->andReturn($socialUser);

        Role::create(['name' => 'student']);
        Cache::shouldReceive('tags')->with(['users'])->andReturnSelf();
        Cache::shouldReceive('flush')->once();

        $response = $this->get(route('social.callback', ['provider' => 'keycloak']));

        $response->assertRedirect('/projects');

        $this->assertAuthenticated();
        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('John', $user->first_name);
        $this->assertEquals('Doe', $user->second_name);
        $this->assertEquals('Smith', $user->last_name);
        $this->assertEquals('group1', $user->group);
        $this->assertTrue($user->roles->contains('name', 'student'));
    }

    public function test_handle_provider_callback_updates_existing_user()
    {
        Role::create(['name' => 'student']);
        $user = User::factory()->create(['email' => 'test2@example.com', 'first_name' => 'OldName']);
        $user->roles()->attach(Role::where('name', 'student')->first()->id);

        $socialUser = new SocialiteUser();
        $socialUser->user = [
            'email' => 'test2@example.com',
            'mapping_id' => $user->id,
            'first_name' => 'NewName',
            'family_name' => 'Doe',
            'middle_name' => 'Smith',
            'syncable_cohorts' => 'group2',
        ];

        $this->socialite->shouldReceive('user')->andReturn($socialUser);

        Cache::shouldReceive('tags')->with(['users'])->andReturnSelf();
        Cache::shouldReceive('flush')->once();

        $response = $this->get(route('social.callback', ['provider' => 'keycloak']));

        $response->assertRedirect('/projects');

        $this->assertAuthenticatedAs($user);
        $user->refresh();
        $this->assertEquals('NewName', $user->first_name);
        $this->assertEquals('group2', $user->group);
    }

    public function test_handle_provider_callback_aborts_for_unsupported_provider()
    {
        Log::shouldReceive('error')->with('Не поддерживаемый провайдер: google')->once();

        $response = $this->get(route('social.callback', ['provider' => 'google']));

        $response->assertNotFound();
    }

    public function test_handle_provider_callback_handles_exception()
    {
        $this->socialite->shouldReceive('user')->andThrow(new \Exception('Auth failed'));

        Log::shouldReceive('error')->with('Ошибка авторизации: Auth failed')->once();

        $response = $this->get(route('social.callback', ['provider' => 'keycloak']));

        $response->assertRedirect('/')
            ->assertSessionHas('error', 'Ошибка авторизации: Auth failed');
    }

    public function test_logout_redirects_to_keycloak_logout()
    {
        /** @var \App\Models\User $user */
        $user = User::factory()->create();
        $this->actingAs($user);

        config([
            'services.keycloak.base_url' => 'https://keycloak.example.com',
            'services.keycloak.realm' => 'myrealm',
            'services.keycloak.client_id' => 'myclient',
            'app.url' => 'http://localhost',
        ]);

        $response = $this->get(route('logout'));

        $expectedUrl = 'https://auth.sevsu.ru/realms/portal/protocol/openid-connect/logout?client_id=project-showcase&post_logout_redirect_uri=http%3A%2F%2Flocalhost%3A8000%2F';
        $response->assertRedirect($expectedUrl);
        $this->assertGuest();
    }
}
