<?php

namespace Tests\Feature\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use Mockery;
use Tests\TestCase;
use App\Services\UserService;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create();
        $role = Role::factory()->create(['name' => 'admin']);
        $this->admin->roles()->attach($role);
        $this->actingAs($this->admin);
    }

    public function test_index_returns_users_view()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $filters = ['search' => 'John', 'roles' => ['admin']];
        $users = [['id' => 1, 'name' => 'John']];
        $roles = ['admin', 'mentor'];

        $userService->shouldReceive('getAdminUsers')->with($filters)->andReturn($users);
        $userService->shouldReceive('getAvailableRoles')->andReturn($roles);

        $response = $this->get(route('admin.users.index', $filters));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('admin/Users', false)
                ->where('users.0.id', 1)
                ->where('roles.0', 'admin')
                ->where('filters.search', 'John')
        );
    }

    public function test_index_handles_error()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $userService->shouldReceive('getAdminUsers')->andThrow(new \Exception('Ошибка получения пользователей'));
        $userService->shouldReceive('getAvailableRoles')->andReturn(['admin']);

        \Illuminate\Support\Facades\Log::shouldReceive('error')->once();

        $response = $this->get(route('admin.users.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('admin/Users', false)
                ->where('error', 'Не удалось загрузить пользователей')
        );
    }

    public function test_show_returns_user_view()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $user = ['id' => 1, 'first_name' => 'Alice'];
        $roles = ['admin' => 'Admin'];

        $userService->shouldReceive('getUserById')->with('1')->andReturn($user);
        $userService->shouldReceive('getAvailableRoles')->andReturn($roles);

        $response = $this->get(route('admin.users.show', 1));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('admin/User', false)
                ->where('user.id', 1)
                ->where('roles.admin', 'Admin')
        );
    }

    public function test_show_handles_error()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $userService->shouldReceive('getUserById')->with('1')->andThrow(new \Exception('Ошибка получения пользователя'));

        \Illuminate\Support\Facades\Log::shouldReceive('error')->once();

        $response = $this->get(route('admin.users.show', 1));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) =>
            $page->component('admin/User', false)
                ->where('error', 'Не удалось загрузить пользователя')
        );
    }

    public function test_update_user_with_admin_role()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $data = [
            'firstName' => 'Test',
            'email' => 'test@example.com',
            'roles' => ['admin'],
        ];

        $userId = \Illuminate\Support\Str::uuid()->toString();

        $userService->shouldReceive('updateUser')->with($userId, $data)->andReturn($data);

        $response = $this->put(route('admin.users.update', $userId), $data);

        $response->assertRedirect(route('admin.users.show', $userId));
        $response->assertSessionHas('success', 'Данные пользователя обновлены');
    }

    public function test_update_handles_error()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $userId = \Illuminate\Support\Str::uuid()->toString();
        $data = [
            'firstName' => 'Test',
            'email' => 'test@example.com',
            'roles' => ['admin'],
        ];

        $userService->shouldReceive('updateUser')->with($userId, $data)->andThrow(new \Exception('Ошибка обновления'));

        \Illuminate\Support\Facades\Log::shouldReceive('error')->once();

        $response = $this->from(route('admin.users.show', $userId))
            ->put(route('admin.users.update', $userId), $data);

        $response->assertRedirect(route('admin.users.show', $userId));
        $response->assertSessionHasErrors(['error' => 'Ошибка обновления']);
    }

    public function test_destroy_user_with_admin_role()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $userService->shouldReceive('deleteUser')->with('1');

        $response = $this->delete(route('admin.users.destroy', 1));

        $response->assertRedirect(route('admin.users.index'));
        $response->assertSessionHas('success', 'Пользователь успешно удалён');
    }

    public function test_destroy_handles_error()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $userService->shouldReceive('deleteUser')->with('1')->andThrow(new \Exception('Ошибка удаления'));

        \Illuminate\Support\Facades\Log::shouldReceive('error')->once();

        $response = $this->from(route('admin.users.index'))
            ->delete(route('admin.users.destroy', 1));

        $response->assertRedirect(route('admin.users.index'));
        $response->assertSessionHasErrors(['error' => 'Ошибка удаления']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
