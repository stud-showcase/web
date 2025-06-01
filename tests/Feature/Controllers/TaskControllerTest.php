<?php

namespace Tests\Feature\Controllers;

use App\Http\Requests\CreateApplicationRequest;
use App\Models\Complexity;
use App\Models\User;
use App\Services\TaskService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;
use Mockery;

class TaskControllerTest extends TestCase
{
    protected $taskService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->taskService = Mockery::mock(TaskService::class);
        $this->app->instance(TaskService::class, $this->taskService);
        /** @var \App\Models\User $user */
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_index_renders_task_bank_page_with_filters()
    {
        $filters = ['complexity' => [(string)Complexity::COMPLEXITY_EASY, (string)Complexity::COMPLEXITY_HARD], 'search' => 'test'];
        $tasks = [
            ['id' => 1, 'title' => 'Task 1'],
            ['id' => 2, 'title' => 'Task 2'],
        ];
        $availableFilters = ['tags' => ['tag1'], 'customers' => ['customer1']];

        $this->taskService->shouldReceive('getFilteredTasks')
            ->with($filters)
            ->andReturn($tasks);
        $this->taskService->shouldReceive('getAvailableFilters')
            ->with(['tags', 'customers'])
            ->andReturn($availableFilters);

        $response = $this->get('/tasks?' . http_build_query($filters));

        $response->assertOk()->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/TaskBank', false)
                ->has('tasks', 2)
                ->where('filters', $filters)
                ->where('availableFilters', $availableFilters)
        );
    }

    public function test_show_renders_task_page()
    {
        $taskId = 1;
        $taskData = ['id' => $taskId, 'title' => 'Test Task'];

        $this->taskService->shouldReceive('getFormattedTaskById')
            ->with($taskId)
            ->andReturn($taskData);

        $response = $this->get(route('tasks.show', $taskId));

        $response->assertOk()->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/Task', false)
                ->where('task', $taskData)
        );
    }

    public function test_show_application_renders_application_page()
    {
        $response = $this->get(route('application.show'));

        $response->assertOk()->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/Application', false)
        );
    }

    public function test_create_application_redirects_on_success()
    {
        $data = [
            'title' => 'New Application',
            'description' => 'Test description',
            'customer' => 'Test Customer',
            'customerEmail' => 'test@example.com',
        ];
        $files = [UploadedFile::fake()->create('document.pdf', 100)];

        $this->taskService->shouldReceive('createApplication')
            ->with($data, $files)
            ->andReturn(1);

        $this->partialMock(CreateApplicationRequest::class, function ($mock) use ($data, $files) { // Добавлен $files
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
            $mock->shouldReceive('file')->with('files')->andReturn($files);
        });

        Storage::fake('public');

        $response = $this->post(route('application.create'), array_merge($data, ['files' => $files]));

        $response->assertRedirect()
            ->assertSessionHas('success', 'Заявка успешно отправлена.');
    }

    public function test_create_application_handles_exception()
    {
        $data = [
            'title' => 'New Application',
            'description' => 'Test description',
            'customer' => 'Test Customer',
            'customerEmail' => 'test@example.com',
        ];
        $files = [UploadedFile::fake()->create('document.pdf', 100)];

        $this->taskService->shouldReceive('createApplication')
            ->with($data, $files)
            ->andThrow(new \Exception('Application creation failed'));

        $this->partialMock(CreateApplicationRequest::class, function ($mock) use ($data, $files) { // Добавлен $files
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
            $mock->shouldReceive('file')->with('files')->andReturn($files);
        });

        Storage::fake('public');
        Log::shouldReceive('error')->once();

        $response = $this->post(route('application.create'), array_merge($data, ['files' => $files]));

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Не удалось создать заявку.']);
    }
}
