<?php

namespace Tests\Feature\Controllers\Admin;

use App\Models\Complexity;
use App\Models\Role;
use App\Models\User;
use App\Services\TaskService;
use App\Services\UserService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Mockery;
use Tests\TestCase;

class TaskRequestControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected function createAdminUser(): User
    {
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'admin']);
        $user->roles()->sync([$role->id]);
        return $user;
    }

    protected function createMentorUser(): User
    {
        $user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'mentor']);
        $user->roles()->sync([$role->id]);
        return $user;
    }

    protected function setUp(): void
    {
        parent::setUp();

        Complexity::truncate();
        Complexity::create(['id' => Complexity::COMPLEXITY_EASY, 'name' => 'Легкий']);
        Complexity::create(['id' => Complexity::COMPLEXITY_MEDIUM, 'name' => 'Средний']);
        Complexity::create(['id' => Complexity::COMPLEXITY_HARD, 'name' => 'Тяжелый']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_index_renders_applications_with_filters()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('getFilteredTaskRequests')
            ->once()
            ->with(['search' => 'test', 'withProject' => '1', 'customers' => 'Ivan', 'perPage' => '10'])
            ->andReturn(['data' => [], 'current_page' => 1, 'per_page' => 10, 'total' => 0]);
        $taskService->shouldReceive('getAvailableFilters')
            ->once()
            ->with(['customers'])
            ->andReturn(['customers' => [['name' => 'Ivan']]]);
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->get(route('admin.applications.index', [
            'search' => 'test',
            'withProject' => '1',
            'customers' => 'Ivan',
            'perPage' => '10',
        ]));

        $response->assertOk();
        $response->assertInertia(
            fn($page) => $page
                ->component('admin/Applications', false)
                ->has('taskRequests')
                ->has('filters')
                ->has('availableFilters')
        );
    }

    public function test_show_renders_application_with_task_request_and_users()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('getTaskRequestById')
            ->once()
            ->with(42)
            ->andReturn(['id' => 42, 'title' => 'Test Request']);
        $taskService->shouldReceive('getAvailableFilters')
            ->once()
            ->with(['tags'])
            ->andReturn(['tags' => [['name' => 'tag1']]]);
        $this->app->instance(TaskService::class, $taskService);

        $userService = Mockery::mock(UserService::class);
        $userService->shouldReceive('getPrivilegedUsers')
            ->once()
            ->andReturn([['id' => 1, 'name' => 'Mentor']]);
        $this->app->instance(UserService::class, $userService);

        $response = $this->get(route('admin.applications.show', ['id' => 42]));

        $response->assertOk();
        $response->assertInertia(
            fn($page) => $page
                ->component('admin/Application', false)
                ->has('taskRequest')
                ->has('users')
                ->has('tags')
        );
    }

    public function test_responsible_renders_applications_with_task_requests()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('getResponsibleUserTaskRequests')
            ->once()
            ->with(['search' => 'test'])
            ->andReturn(['data' => [], 'current_page' => 1, 'per_page' => 10, 'total' => 0]);

        $taskService->shouldReceive('getAvailableFilters')
            ->once()
            ->with(['taskRequestCustomers'], Mockery::any())
            ->andReturn(['taskRequestCustomers' => []]);

        $this->app->instance(TaskService::class, $taskService);

        $response = $this->get(route('admin.myApplications', ['search' => 'test']));

        $response->assertOk();
        $response->assertInertia(
            fn($page) => $page
                ->component('admin/Applications', false)
                ->has('taskRequests')
                ->has('filters')
                ->has('availableFilters')
        );
    }

    public function test_destroy_deletes_task_request_successfully()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('deleteTaskRequest')->once()->with(42);
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->delete(route('admin.applications.destroy', ['id' => 42]));

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('success', 'Заявка успешно удалена');
    }

    public function test_destroy_handles_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('deleteTaskRequest')
            ->once()
            ->with(42)
            ->andThrow(new \Exception('Ошибка удаления'));
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->delete(route('admin.applications.destroy', ['id' => 42]));

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('error', 'Ошибка удаления заявки [42]');
    }

    public function test_approve_successfully_approves_task_request()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $data = [
            'title' => 'Test title',
            'description' => 'Test description',
            'customer' => 'Иван Иванов',
            'customerEmail' => 'ivan@example.com',
            'maxMembers' => 10,
            'deadline' => now()->addDays(5)->format('Y-m-d'),
            'complexityId' => Complexity::COMPLEXITY_MEDIUM,
            'withProject' => false,
        ];

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('approveTaskRequest')
            ->once()
            ->with(42, Mockery::on(function ($arg) use ($data) {
                return $arg['title'] === $data['title'] &&
                    $arg['description'] === $data['description'] &&
                    $arg['customer'] === $data['customer'] &&
                    $arg['customerEmail'] === $data['customerEmail'] &&
                    $arg['maxMembers'] === $data['maxMembers'] &&
                    $arg['deadline'] === $data['deadline'] &&
                    $arg['complexityId'] === $data['complexityId'];
            }), [])
            ->andReturn(1);
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->post(route('admin.applications.approve', ['id' => 42]), $data);

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('success', 'Заявка успешно одобрена');
    }

    public function test_approve_handles_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $data = [
            'title' => 'Test title',
            'description' => 'Test description',
            'customer' => 'Иван Иванов',
            'customerEmail' => 'ivan@example.com',
            'maxMembers' => 10,
            'deadline' => now()->addDays(5)->format('Y-m-d'),
            'complexityId' => Complexity::COMPLEXITY_MEDIUM,
            'withProject' => false,
        ];

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('approveTaskRequest')
            ->once()
            ->with(42, Mockery::on(function ($arg) use ($data) {
                return $arg['title'] === $data['title'] &&
                    $arg['description'] === $data['description'] &&
                    $arg['customer'] === $data['customer'] &&
                    $arg['customerEmail'] === $data['customerEmail'] &&
                    $arg['maxMembers'] === $data['maxMembers'] &&
                    $arg['deadline'] === $data['deadline'] &&
                    $arg['complexityId'] === $data['complexityId'];
            }), [])
            ->andThrow(new \Exception('Ошибка одобрения'));
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->post(route('admin.applications.approve', ['id' => 42]), $data);

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('error', 'Ошибка одобрения заявки [42]');
    }

    public function test_update_responsible_successfully_updates_user()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $mentor = $this->createMentorUser();

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('updateTaskRequestResponsibleUser')
            ->once()
            ->with(42, $mentor->id);
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->put(route('admin.applications.responsible.update', ['id' => 42]), [
            'responsibleUserId' => $mentor->id,
        ]);

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('success', 'Ответственный успешно обновлен');
    }

    public function test_update_responsible_handles_error()
    {
        $admin = $this->createAdminUser();
        $this->actingAs($admin);

        $mentor = $this->createMentorUser();

        $taskService = Mockery::mock(TaskService::class);
        $taskService->shouldReceive('updateTaskRequestResponsibleUser')
            ->once()
            ->with(42, $mentor->id)
            ->andThrow(new \Exception('Ошибка'));
        $this->app->instance(TaskService::class, $taskService);

        $response = $this->put(route('admin.applications.responsible.update', ['id' => 42]), [
            'responsibleUserId' => $mentor->id,
        ]);

        $response->assertRedirect(route('admin.applications.index'));
        $response->assertSessionHas('error', 'Ошибка назначения ответственного [42]');
    }
}
