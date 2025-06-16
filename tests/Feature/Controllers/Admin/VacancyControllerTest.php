<?php

namespace Tests\Feature\Controllers\Admin;

use App\Http\Requests\CreateVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Http\Requests\DeleteVacancyRequest;
use App\Models\Role;
use App\Models\User;
use App\Models\Vacancy;
use App\Services\VacancyService;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;
use Mockery;

class VacancyControllerTest extends TestCase
{
    protected $vacancyService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->vacancyService = Mockery::mock(VacancyService::class);
        $this->app->instance(VacancyService::class, $this->vacancyService);
        /** @var \App\Models\User $user */
        $this->user = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'admin']);
        $this->user->roles()->attach($role->id);
        $this->actingAs($this->user);
    }

    public function test_store_creates_vacancy_and_redirects()
    {
        $projectId = 1;
        $data = ['name' => 'New Vacancy', 'description' => 'Test vacancy'];
        $vacancy = new Vacancy(['id' => 1, 'name' => 'New Vacancy', 'description' => 'Test vacancy', 'project_id' => $projectId]);

        $this->vacancyService->shouldReceive('createVacancy')
            ->with($projectId, $data)
            ->andReturn($vacancy);

        $this->partialMock(CreateVacancyRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        $response = $this->post(route('admin.projects.vacancy.store', $projectId), $data);

        $response->assertRedirect(route('admin.projects.show', $projectId))
            ->assertSessionHas('success', 'Вакансия создана');
    }

    public function test_store_handles_exception()
    {
        $projectId = 1;
        $data = ['name' => 'New Vacancy', 'description' => 'Test vacancy'];

        $this->vacancyService->shouldReceive('createVacancy')
            ->with($projectId, $data)
            ->andThrow(new \Exception('Creation failed'));

        $this->partialMock(CreateVacancyRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        Log::shouldReceive('error')->once();

        $response = $this->post(route('admin.projects.vacancy.store', $projectId), $data);

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Creation failed']);
    }

    public function test_update_updates_vacancy_and_redirects()
    {
        $projectId = 1;
        $vacancyId = 1;
        $data = ['name' => 'Updated Vacancy', 'description' => 'Updated description'];
        $vacancy = new Vacancy(['id' => $vacancyId, 'name' => 'Updated Vacancy', 'description' => 'Updated description', 'project_id' => $projectId]);

        $this->vacancyService->shouldReceive('updateVacancy')
            ->with($vacancyId, $data)
            ->andReturn($vacancy);

        $this->partialMock(UpdateVacancyRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        $response = $this->put(route('admin.projects.vacancy.update', [$projectId, $vacancyId]), $data);

        $response->assertRedirect(route('admin.projects.show', $projectId))
            ->assertSessionHas('success', 'Вакансия обновлена');
    }

    public function test_update_handles_exception()
    {
        $projectId = 1;
        $vacancyId = 1;
        $data = ['name' => 'Updated Vacancy', 'description' => 'Updated description'];

        $this->vacancyService->shouldReceive('updateVacancy')
            ->with($vacancyId, $data)
            ->andThrow(new \Exception('Update failed'));

        $this->partialMock(UpdateVacancyRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        Log::shouldReceive('error')->once();

        $response = $this->put(route('admin.projects.vacancy.update', [$projectId, $vacancyId]), $data);

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Update failed']);
    }

    public function test_destroy_deletes_vacancy_and_redirects()
    {
        $projectId = 1;
        $vacancyId = 1;

        $this->vacancyService->shouldReceive('deleteVacancy')
            ->with($vacancyId)
            ->andReturn(true);

        $this->partialMock(DeleteVacancyRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('admin.projects.vacancy.destroy', [$projectId, $vacancyId]));

        $response->assertRedirect(route('admin.projects.show', $projectId))
            ->assertSessionHas('success', 'Вакансия удалена');
    }

    public function test_destroy_handles_exception()
    {
        $projectId = 1;
        $vacancyId = 1;

        $this->vacancyService->shouldReceive('deleteVacancy')
            ->with($vacancyId)
            ->andThrow(new \Exception('Deletion failed'));

        $this->partialMock(DeleteVacancyRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        Log::shouldReceive('error')->once();

        $response = $this->delete(route('admin.projects.vacancy.destroy', [$projectId, $vacancyId]));

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Deletion failed']);
    }
}
