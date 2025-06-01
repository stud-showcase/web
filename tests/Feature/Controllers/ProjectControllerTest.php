<?php

namespace Tests\Feature\Controllers;

use App\Http\Requests\AcceptInviteRequest;
use App\Http\Requests\CreateInviteRequest;
use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\DeleteProjectFileRequest;
use App\Http\Requests\DeleteProjectMemberRequest;
use App\Http\Requests\RejectInviteRequest;
use App\Http\Requests\ShowControlPanelRequest;
use App\Http\Requests\UpdateProjectMemberRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\UploadProjectFileRequest;
use App\Models\Project;
use App\Models\ProjectInvite;
use App\Models\ProjectStatus;
use App\Models\Task;
use App\Models\User;
use App\Services\ProjectService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;
use Mockery;

class ProjectControllerTest extends TestCase
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;
    use \Illuminate\Foundation\Testing\WithFaker;

    protected $projectService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->projectService = Mockery::mock(ProjectService::class);
        $this->app->instance(ProjectService::class, $this->projectService);
        /** @var \App\Models\User $user */
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
    }

    public function test_index_renders_projects_page_with_filters()
    {
        $filters = ['status' => 'active', 'search' => 'test'];
        $projects = [
            ['id' => 1, 'name' => 'Project 1'],
            ['id' => 2, 'name' => 'Project 2'],
        ];
        $availableFilters = ['tags' => ['tag1', 'tag2']];

        $this->projectService->shouldReceive('getProjects')
            ->with($filters)
            ->andReturn($projects);
        $this->projectService->shouldReceive('getAvailableFilters')
            ->with(['tags'])
            ->andReturn($availableFilters);

        $response = $this->get('/projects?' . http_build_query($filters));

        $response->assertOk()->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/Projects', false)
                ->has('projects', 2)
                ->where('filters', $filters)
                ->where('availableFilters', $availableFilters)
        );
    }

    public function test_renders_user_projects_page()
    {
        $filters = ['status' => (string) ProjectStatus::STATUS_PROGRESS];
        $projects = [
            ['id' => 1, 'name' => 'User Project 1'],
        ];
        $availableFilters = ['tags' => ['tag1']];

        $this->projectService->shouldReceive('getUserProjects')
            ->with($filters)
            ->andReturn($projects);
        $this->projectService->shouldReceive('getAvailableFilters')
            ->with(['tags'], true)
            ->andReturn($availableFilters);

        $response = $this->actingAs($this->user)->get('/myProjects?' . http_build_query($filters));

        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/Projects', false)
                ->has('projects', 1)
                ->where('filters', $filters)
                ->where('availableFilters', $availableFilters)
        );
    }

    public function test_show_renders_project_page()
    {
        $projectId = 1;
        $projectData = ['id' => $projectId, 'name' => 'Test Project'];

        $this->projectService->shouldReceive('getProjectById')
            ->with($projectId)
            ->andReturn($projectData);

        $response = $this->get(route('projects.show', $projectId));

        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/Project', false)
                ->where('project', $projectData)
        );
    }

    public function test_renders_control_panel_page()
    {
        $projectId = 1;
        $projectData = ['id' => $projectId, 'name' => 'Test Project'];

        $this->projectService->shouldReceive('getProjectById')
            ->with($projectId)
            ->andReturn($projectData);

        $this->partialMock(ShowControlPanelRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->get(route('projects.controlPanel.show', $projectId));

        $response->assertInertia(
            fn(AssertableInertia $page) => $page
                ->component('user/ProjectControlPanel', false)
                ->where('project', $projectData)
        );
    }

    public function test_store_project_and_redirects()
    {
        $task = Task::factory()->create();
        $projectData = ['taskId' => $task->id, 'projectName' => 'New Project'];
        $project = Project::factory()->make(['id' => 1]);

        $this->projectService->shouldReceive('createProject')
            ->with($task->id, 'New Project', $this->user)
            ->andReturn($project);

        $this->partialMock(CreateProjectRequest::class, function ($mock) use ($task) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn(['taskId' => $task->id, 'projectName' => 'New Project']);
        });

        $response = $this->post(route('projects.store'), $projectData);

        $response->assertRedirect(route('projects.show', $project->id))
            ->assertSessionHas('success', 'Проект успешно создан.');
    }

    public function test_store_handles_exception()
    {
        $task = Task::factory()->create();
        $projectData = ['taskId' => $task->id, 'projectName' => 'New Project'];

        $this->projectService->shouldReceive('createProject')
            ->andThrow(new \Exception('Creation failed'));

        $this->partialMock(CreateProjectRequest::class, function ($mock) use ($task) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn(['taskId' => $task->id, 'projectName' => 'New Project']);
        });

        Log::shouldReceive('error')->once();

        $response = $this->post(route('projects.store'), $projectData);

        $response->assertRedirect()
            ->assertSessionHasErrors(['error' => 'Creation failed']);
    }

    public function test_update_project_and_redirects()
    {
        $project = Project::factory()->create();
        $updateData = ['name' => 'Updated Project'];

        $this->projectService->shouldReceive('updateProject')
            ->with($project->id, $updateData)
            ->andReturn($project);

        $this->partialMock(UpdateProjectRequest::class, function ($mock) use ($updateData) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($updateData);
        });

        $response = $this->put(route('projects.update', $project->id), $updateData);

        $response->assertRedirect(route('projects.controlPanel.show', $project->id))
            ->assertSessionHas('success', 'Проект успешно обновлён.');
    }

    public function test_creates_invite_and_redirects()
    {
        $project = Project::factory()->create(['is_close' => false]);
        $data = ['vacancyId' => null];

        $this->projectService->shouldReceive('createInvite')
            ->with($this->user->id, $project->id, null)
            ->andReturn(null);

        $this->partialMock(CreateInviteRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        $response = $this->post(route('projects.invite.create', $project->id), $data);

        $response->assertRedirect(route('projects.show', $project->id))
            ->assertSessionHas('success', 'Приглашение создано.');
    }

    public function test_accepts_invite_and_redirects()
    {
        $project = Project::factory()->create();
        $invite = ProjectInvite::factory()->create(['project_id' => $project->id, 'user_id' => $this->user->id]);

        $this->projectService->shouldReceive('acceptInvite')
            ->with($invite->id)
            ->andReturn(null);

        $this->partialMock(AcceptInviteRequest::class, function ($mock) use ($invite) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn(['inviteId' => $invite->id]);
        });

        $response = $this->post(route('projects.invite.accept', $project->id), ['inviteId' => $invite->id]);

        $response->assertRedirect(route('projects.show', $project->id))
            ->assertSessionHas('success', 'Приглашение принято.');
    }

    public function test_rejects_invite_and_redirects()
    {
        $project = Project::factory()->create();
        $invite = ProjectInvite::factory()->create(['project_id' => $project->id, 'user_id' => $this->user->id]);

        $this->projectService->shouldReceive('rejectInvite')
            ->with($invite->id)
            ->andReturn(null);

        $this->partialMock(RejectInviteRequest::class, function ($mock) use ($invite) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn(['inviteId' => $invite->id]);
        });

        $response = $this->post(route('projects.invite.reject', $project->id), ['inviteId' => $invite->id]);

        $response->assertRedirect(route('projects.show', $project->id))
            ->assertSessionHas('success', 'Приглашение отклонено.');
    }

    public function test_uploads_files_and_redirects()
    {
        Storage::fake('public');
        $project = Project::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $this->projectService->shouldReceive('uploadFiles')
            ->with($project->id, [$file])
            ->andReturn(null);

        $this->partialMock(UploadProjectFileRequest::class, function ($mock) use ($file) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('file')->with('files')->andReturn([$file]);
        });

        $response = $this->post(route('projects.files.upload', $project->id), ['files' => [$file]]);

        $response->assertRedirect(route('projects.controlPanel.show', $project->id))
            ->assertSessionHas('success', 'Файлы успешно загружены.');
    }

    public function test_deletes_file_and_redirects()
    {
        $project = Project::factory()->create();
        $fileId = 1;

        $this->projectService->shouldReceive('deleteFile')
            ->with($project->id, $fileId)
            ->andReturn(null);

        $this->partialMock(DeleteProjectFileRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('projects.files.delete', [$project->id, $fileId]));

        $response->assertRedirect(route('projects.controlPanel.show', $project->id))
            ->assertSessionHas('success', 'Файл удалён.');
    }

    public function test_updates_member_and_redirects()
    {
        $project = Project::factory()->create();
        $memberId = 'user_1';
        $data = ['position' => 'Developer'];

        $this->projectService->shouldReceive('updateMember')
            ->with($project->id, $memberId, $data)
            ->andReturn(null);

        $this->partialMock(UpdateProjectMemberRequest::class, function ($mock) use ($data) {
            $mock->shouldReceive('authorize')->andReturn(true);
            $mock->shouldReceive('validated')->andReturn($data);
        });

        $response = $this->put(route('projects.member.update', [$project->id, $memberId]), $data);

        $response->assertRedirect(route('projects.controlPanel.show', $project->id))
            ->assertSessionHas('success', 'Участник обновлён.');
    }

    public function test_deletes_member_and_redirects()
    {
        $project = Project::factory()->create();
        $memberId = 'user_1';

        $this->projectService->shouldReceive('deleteMember')
            ->with($project->id, $memberId)
            ->andReturn(null);

        $this->partialMock(DeleteProjectMemberRequest::class, function ($mock) {
            $mock->shouldReceive('authorize')->andReturn(true);
        });

        $response = $this->delete(route('projects.member.delete', [$project->id, $memberId]));

        $response->assertRedirect(route('projects.controlPanel.show', $project->id))
            ->assertSessionHas('success', 'Участник удалён.');
    }
}
