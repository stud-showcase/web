<?php

namespace Tests\Feature\Controllers\Admin;

use App\Models\Role;
use App\Models\Task;
use App\Models\TaskFile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticateAsAdmin(): User
    {
        $user = User::factory()->create();
        $role = Role::factory()->create(['name' => 'admin']);
        $user->roles()->attach($role->id);
        /** @var \App\Models\User $user */
        $this->actingAs($user);
        return $user;
    }

    protected function prepareComplexity(): int
    {
        return \App\Models\Complexity::firstOrCreate(['name' => 'Легкий'])->id;
    }

    public function test_index_returns_successful_response()
    {
        $this->authenticateAsAdmin();

        $response = $this->get(route('admin.tasks.index'));

        $response->assertOk();
    }

    public function test_show_returns_task()
    {
        $this->authenticateAsAdmin();
        $task = Task::factory()->create([
            'complexity_id' => $this->prepareComplexity()
        ]);

        $response = $this->get(route('admin.tasks.show', $task->id));
        $response->assertOk();
    }

    public function test_create_view_is_accessible_by_admin()
    {
        $this->authenticateAsAdmin();

        $response = $this->get(route('admin.tasks.create'));

        $response->assertOk();
    }

    public function test_store_persists_new_task()
    {
        $this->authenticateAsAdmin();

        $complexityId = $this->prepareComplexity();

        $data = [
            'title' => 'Test Task',
            'description' => 'Описание задачи',
            'customer' => 'ООО Ромашка',
            'customerEmail' => 'test@example.com',
            'customerPhone' => '+79991234567',
            'maxMembers' => 3,
            'maxProjects' => 1,
            'deadline' => now()->addDays(10)->toDateString(),
            'complexityId' => $complexityId,
        ];

        $response = $this->post(route('admin.tasks.store'), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', ['title' => 'Test Task']);
    }

    public function test_update_changes_task_data()
    {
        $this->authenticateAsAdmin();

        $complexityId = $this->prepareComplexity();

        $task = Task::factory()->create([
            'complexity_id' => $complexityId,
        ]);

        $data = [
            'title' => 'Updated Title',
            'description' => 'Updated desc',
            'customer' => 'Новый заказчик',
            'customerEmail' => 'new@example.com',
            'customerPhone' => '+79991112233',
            'maxMembers' => 5,
            'maxProjects' => 2,
            'deadline' => now()->addDays(5)->toDateString(),
            'complexityId' => $complexityId,
        ];

        $response = $this->put(route('admin.tasks.update', $task->id), $data);

        $response->assertRedirect();
        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'title' => 'Updated Title']);
    }

    public function test_destroy_deletes_task()
    {
        $this->authenticateAsAdmin();

        $task = Task::factory()->create([
            'complexity_id' => $this->prepareComplexity(),
        ]);

        $response = $this->delete(route('admin.tasks.destroy', $task->id));

        $response->assertRedirect();
        $this->assertSoftDeleted('tasks', ['id' => $task->id]);
    }

    public function test_upload_files_to_task(): void
    {
        $admin = $this->authenticateAsAdmin();

        Storage::fake('public');

        $task = Task::factory()->create();

        $file = UploadedFile::fake()->create('test.pdf', 100, 'application/pdf');

        $response = $this->actingAs($admin)
            ->post(route('admin.tasks.files.upload', $task), [
                'files' => [$file],
            ]);

        $response->assertRedirect();

        $storedFiles = Storage::disk('public')->files("task_files/{$task->id}");
        $this->assertCount(1, $storedFiles, 'Ожидался один загруженный файл');

        $this->assertStringEndsWith('.pdf', $storedFiles[0]);
    }


    public function test_delete_file_from_task()
    {
        $this->authenticateAsAdmin();
        Storage::fake('public');

        $task = Task::factory()->create([
            'complexity_id' => $this->prepareComplexity(),
        ]);

        $file = UploadedFile::fake()->create('to_delete.pdf');
        $path = $file->storeAs("task_files/{$task->id}", $file->hashName(), 'public');

        $taskFile = TaskFile::create([
            'task_id' => $task->id,
            'path' => $path,
            'name' => $file->getClientOriginalName(),
        ]);

        $response = $this->delete(route('admin.tasks.files.destroy', [
            'taskId' => $task->id,
            'fileId' => $taskFile->id,
        ]));

        $response->assertRedirect();

        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('public');
        $disk->assertMissing($path);

        $this->assertDatabaseMissing('task_files', ['id' => $taskFile->id]);
    }
}
