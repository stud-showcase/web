<?php

namespace Tests\Feature\Controllers\Admin;

use App\Http\Requests\Admin\CreateProjectRequest as AdminCreateProjectRequest;
use App\Http\Requests\Admin\DeleteProjectFileRequest as AdminDeleteProjectFileRequest;
use App\Http\Requests\Admin\DeleteProjectMemberRequest as AdminDeleteProjectMemberRequest;
use App\Http\Requests\Admin\DeleteProjectRequest as AdminDeleteProjectRequest;
use App\Http\Requests\Admin\RemoveProjectMentorRequest as AdminRemoveProjectMentorRequest;
use App\Http\Requests\Admin\SetProjectMentorRequest as AdminSetProjectMentorRequest;
use App\Http\Requests\Admin\UpdateProjectMemberRequest as AdminUpdateProjectMemberRequest;
use App\Http\Requests\Admin\UpdateProjectRequest as AdminUpdateProjectRequest;
use App\Http\Requests\Admin\UpdateSettingsRequest as AdminUpdateSettingsRequest;
use App\Http\Requests\Admin\UploadProjectFileRequest as AdminUploadProjectFileRequest;
use App\Models\Project;
use App\Models\Role;
use App\Models\Task;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\UserService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;
use Mockery;

class ProjectControllerTest extends TestCase
{
    use DatabaseTransactions;
    use WithFaker;

    protected $projectService;
    protected $userService;
    protected $adminUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->app['config']->set('logging.default', 'null');

        $this->projectService = Mockery::mock(ProjectService::class);
        $this->userService = Mockery::mock(UserService::class);
        $this->app->instance(ProjectService::class, $this->projectService);
        $this->app->instance(UserService::class, $this->userService);

        $this->adminUser = $this->authenticateAsAdmin();
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    protected function authenticateAsAdmin(): User
    {
        $user = User::factory()->create();
        $role = Role::factory()->create(['name' => 'admin']);
        $user->roles()->attach($role->id);
        /** @var \App\Models\User $user */
        $this->actingAs($user);
        return $user;
    }

    public function test_index_renders_projects_page_with_filters()
    {
        $filters = ['search' => 'test', 'status' => 'active', 'perPage' => '10']; // Изменил на строку
        $projects = [
            ['id' => 1, 'name' => 'Project 1'],
            ['id' => 2, 'name' => 'Project 2'],
        ];

        $this->projectService->shouldReceive('getAdminProjects')
            ->with($filters)
            ->andReturn($projects);

        $response = $this->get(route('admin.projects.index') . '?' . http_build_query($filters));

        $response->assertOk()->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('admin/Projects', false)
                ->has('projects', 2)
                ->where('filters', $filters)
        );
    }

    public function test_show_renders_project_page()
    {
        $projectId = 1;
        $projectData = ['id' => $projectId, 'name' => 'Test Project'];
        $users = [['id' => 'user1', 'name' => 'User One']];

        $this->projectService->shouldReceive('getProjectById')
            ->with($projectId)
            ->andReturn($projectData);
        $this->userService->shouldReceive('getPrivilegedUsers')
            ->andReturn($users);

        $response = $this->get(route('admin.projects.show', $projectId));

        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('admin/Project', false)
                ->where('project', $projectData)
                ->has('users', 1)
        );
    }

    public function test_store_creates_project_and_redirects()
    {
        $task = Task::factory()->create();
        $projectData = ['taskId' => $task->id, 'projectName' => 'New Admin Project'];
        $project = Project::factory()->make(['id' => 1]);

        $this->projectService->shouldReceive('createProject')
            ->with($task->id, 'New Admin Project', $this->adminUser)
            ->andReturn($project);

        $this->partialMock(AdminCreateProjectRequest::class, function ($mock) use ($task, $projectData) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($projectData);
        });

        $response = $this->post(route('admin.projects.store'), $projectData);

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Проект успешно создан.');
    }

    public function test_store_handles_exception()
    {
        $task = Task::factory()->create();
        $projectData = ['taskId' => $task->id, 'projectName' => 'New Admin Project'];
        $this->projectService->shouldReceive('createProject')
            ->andThrow(new \Exception('Creation failed'));

        $this->partialMock(AdminCreateProjectRequest::class, function ($mock) use ($task, $projectData) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($projectData);
        });
        Log::shouldReceive('error')->once();

        $response = $this->post(route('admin.projects.store'), $projectData);

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Creation failed']);
    }

    public function test_update_updates_project_and_redirects()
    {
        $project = Project::factory()->create();
        $updateData = ['name' => 'Updated Admin Project'];

        $this->projectService->shouldReceive('updateProject')
            ->with($project->id, $updateData)
            ->andReturn($project);

        $this->partialMock(AdminUpdateProjectRequest::class, function ($mock) use ($updateData) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($updateData);
        });

        $response = $this->put(route('admin.projects.update', $project->id), $updateData);

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Проект успешно обновлён.');
    }

    public function test_destroy_deletes_project_and_redirects()
    {
        $project = Project::factory()->create();

        $this->projectService->shouldReceive('deleteProject')
            ->with($project->id)
            ->andReturn(null);

        $this->partialMock(AdminDeleteProjectRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('admin.projects.destroy', $project->id));

        $response->assertRedirect(route('admin.projects.index'))
            ->assertSessionHas('success', 'Проект успешно удалён.');
    }

    public function test_setMentor_sets_mentor_and_redirects()
    {
        $projectId = 1;
        $mentorId = 'mentor1';

        $this->projectService->shouldReceive('setMentor')
            ->with($projectId, $mentorId)
            ->andReturn(null);

        $this->partialMock(AdminSetProjectMentorRequest::class, function ($mock) use ($mentorId) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn(['mentorId' => $mentorId]);
        });

        $response = $this->post(route('admin.projects.mentor.set', $projectId), ['mentorId' => $mentorId]);

        $response->assertRedirect(route('admin.projects.show', $projectId))
            ->assertSessionHas('success', 'Ментор успешно назначен.');
    }

    public function test_removeMentor_removes_mentor_and_redirects()
    {
        $projectId = 1;

        $this->projectService->shouldReceive('removeMentor')
            ->with($projectId)
            ->andReturn(null);

        $this->partialMock(AdminRemoveProjectMentorRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn([]);
        });

        $response = $this->delete(route('admin.projects.mentor.remove', $projectId));

        $response->assertRedirect(route('admin.projects.show', $projectId))
            ->assertSessionHas('success', 'Ментор успешно удалён.');
    }

    public function test_indexSettings_renders_settings_page()
    {
        $settings = ['startDate' => '2025-06-01', 'endDate' => '2025-06-30'];

        $this->projectService->shouldReceive('getSettings')
            ->andReturn($settings);

        $response = $this->get(route('admin.projects.settings'));

        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('admin/ProjectsSettings', false)
                ->where('settings', $settings)
        );
    }

    public function test_updateSettings_updates_settings_and_redirects()
    {
        $settingsData = ['startDate' => '2025-06-01', 'endDate' => '2025-06-30'];

        $this->projectService->shouldReceive('updateSettings')
            ->with($settingsData)
            ->andReturn(null);

        $this->partialMock(AdminUpdateSettingsRequest::class, function ($mock) use ($settingsData) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($settingsData);
        });

        $response = $this->put(route('admin.projects.settings.update'), $settingsData);

        $response->assertRedirect(route('admin.projects.settings'))
            ->assertSessionHas('success', 'Настройки успешно обновлены');
    }

    public function test_uploadFiles_uploads_files_and_redirects()
    {
        $project = Project::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $this->projectService->shouldReceive('uploadFiles')
            ->with($project->id, [$file])
            ->andReturn(null);

        $this->partialMock(AdminUploadProjectFileRequest::class, function ($mock) use ($file) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('file')->with('files')->andReturn([$file]);
        });

        $response = $this->post(route('admin.projects.files.upload', $project->id), ['files' => [$file]]);

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Файлы успешно загружены');
    }

    public function test_deleteFile_deletes_file_and_redirects()
    {
        $project = Project::factory()->create();
        $fileId = 1;

        $this->projectService->shouldReceive('deleteFile')
            ->with($project->id, $fileId)
            ->andReturn(null);

        $this->partialMock(AdminDeleteProjectFileRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('admin.projects.files.delete', [$project->id, $fileId]));

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Файл удалён');
    }

    public function test_updateMember_updates_member_and_redirects()
    {
        $project = Project::factory()->create();
        $memberId = 'user_1';
        $data = ['position' => 'Developer'];

        $this->projectService->shouldReceive('updateMember')
            ->with($project->id, $memberId, $data)
            ->andReturn(null);

        $this->partialMock(AdminUpdateProjectMemberRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        $response = $this->put(route('admin.projects.member.update', [$project->id, $memberId]), $data);

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Участник обновлён');
    }

    public function test_deleteMember_deletes_member_and_redirects()
    {
        $project = Project::factory()->create();
        $memberId = 'user_1';

        $this->projectService->shouldReceive('deleteMember')
            ->with($project->id, $memberId)
            ->andReturn(null);

        $this->partialMock(AdminDeleteProjectMemberRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('admin.projects.member.delete', [$project->id, $memberId]));

        $response->assertRedirect(route('admin.projects.show', $project->id))
            ->assertSessionHas('success', 'Участник удалён');
    }
}
