<?php

namespace Tests\Feature\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;
use App\Services\UserService;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

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

    public function test_update_user_with_admin_role()
    {
        $userService = Mockery::mock(UserService::class);
        $this->app->instance(UserService::class, $userService);

        $data = [
            'firstName' => 'Test',
            'email' => 'test@example.com',
            'roles' => ['admin'],
        ];

        $userService->shouldReceive('updateUser')->with('1', $data)->andReturn($data);

        $response = $this->put(route('admin.users.update', 1), $data);

        $response->assertRedirect(route('admin.users.show', 1));
        $response->assertSessionHas('success', 'Данные пользователя обновлены');
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

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
