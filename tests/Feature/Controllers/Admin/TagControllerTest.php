<?php

namespace Tests\Feature\Controllers\Admin;

use App\Models\Role;
use App\Models\User;
use App\Models\Tag;
use App\Services\TaskService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class TagControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function createAdminUser(): User
    {
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'admin']);
        $user->roles()->attach($role->id);

        return $user;
    }

    public function test_store_success()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('createTag')->once()->with('Test Tag');

        $response = $this->post(route('admin.tags.store'), ['name' => 'Test Tag']);

        $response->assertRedirect(route('admin.tasks.settings'));
        $response->assertSessionHas('success', 'Тег успешно создан');
    }

    public function test_store_failure_logs_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        Log::shouldReceive('error')->atLeast()->once();

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('createTag')->andThrow(new \Exception('Ошибка'));

        $response = $this->from('/admin/settings')->post(route('admin.tags.store'), ['name' => 'Test Tag']);

        $response->assertRedirect('/admin/tasks/settings');
        $response->assertSessionHas('error', 'Не удалось создать тег');
    }

    public function test_update_success()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $tag = Tag::create(['name' => 'Old Name']);

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('updateTag')->once()->with($tag->id, 'Updated Name');

        $response = $this->put(route('admin.tags.update', ['id' => $tag->id]), ['name' => 'Updated Name']);

        $response->assertRedirect(route('admin.tasks.settings'));
        $response->assertSessionHas('success', 'Тег успешно обновлен');
    }

    public function test_update_failure_logs_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $tag = Tag::create(['name' => 'Old Name']);

        Log::shouldReceive('error')->atLeast()->once();

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('updateTag')->andThrow(new \Exception('Ошибка'));

        $response = $this->from('/admin/settings')->put(route('admin.tags.update', ['id' => $tag->id]), ['name' => 'X']);

        $response->assertRedirect('/admin/tasks/settings');
        $response->assertSessionHas('error', 'Не удалось обновить тег');
    }

    public function test_destroy_success()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $tag = Tag::create(['name' => 'Delete Me']);

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('deleteTag')->once()->with($tag->id);

        $response = $this->delete(route('admin.tags.destroy', ['id' => $tag->id]));

        $response->assertRedirect(route('admin.tasks.settings'));
        $response->assertSessionHas('success', 'Тег успешно удален');
    }

    public function test_destroy_failure_logs_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $tag = Tag::create(['name' => 'Problematic']);

        Log::shouldReceive('error')->atLeast()->once();

        $taskService = $this->mock(TaskService::class);
        $taskService->shouldReceive('deleteTag')->andThrow(new \Exception('Ошибка'));

        $response = $this->from('/admin/settings')->delete(route('admin.tags.destroy', ['id' => $tag->id]));

        $response->assertRedirect(route('admin.tasks.settings'));
        $response->assertSessionHas('error', 'Не удалось удалить тег');
    }
}
