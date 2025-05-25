<?php

use App\Http\Controllers\Admin\AdminProjectController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('user/Main');
});

Route::get('/download/{path}', [FileController::class, 'download'])->name('files.download')->where('path', '.*');
Route::get('/vacancies', [VacancyController::class, 'index'])->name('vacancies.index');

Route::prefix('auth')->middleware('guest')->group(function () {
    Route::get('/{provider}/redirect', [SocialController::class, 'redirectToProvider'])->name('login');
    Route::get('/{provider}/callback', [SocialController::class, 'handleProviderCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/myProjects', [ProjectController::class, 'getUserProjects']);
    Route::get('/logout', [SocialController::class, 'logout'])->name('logout');
});

Route::prefix('application')->group(function () {
    Route::get('/', [TaskController::class, 'showApplication'])->name('application.show');
    Route::post('/', [TaskController::class, 'createApplication'])->name('application.create');
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/{id}', [TaskController::class, 'show'])->name('tasks.show');
});

Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{id}', [ProjectController::class, 'show'])->name('projects.show');

    Route::middleware('auth')->group(function () {
        Route::get('/{id}/controlPanel', [ProjectController::class, 'showControlPanel'])->name('projects.controlPanel.show');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.store');
        Route::put('/{id}', [ProjectController::class, 'update'])->name('projects.update');
        Route::post('/{id}/files', [ProjectController::class, 'uploadFiles'])->name('projects.files.upload');
        Route::delete('/{projectId}/files/{fileId}', [ProjectController::class, 'deleteFile'])->name('projects.files.delete');

        Route::post('{id}/createInvite', [ProjectController::class, 'createInvite'])->name('projects.invite.create');
        Route::post('{id}/acceptInvite', [ProjectController::class, 'acceptInvite'])->name('projects.invite.accept');
        Route::post('{id}/rejectInvite', [ProjectController::class, 'rejectInvite'])->name('projects.invite.reject');

        Route::post('/{id}/vacancy', [VacancyController::class, 'store'])->name('projects.vacancy.create');
        Route::put('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'update'])->name('projects.vacancy.update');
        Route::delete('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'destroy'])->name('projects.vacancy.destroy');

        Route::put('/{projectId}/member/{memberId}', [ProjectController::class, 'updateMember'])->name('projects.member.update');
        Route::delete('/{projectId}/member/{memberId}', [ProjectController::class, 'deleteMember'])->name('projects.member.delete');
    });
});

Route::prefix('admin')->middleware(['auth', 'role:mentor,admin'])->group(function () {
    Route::get('/myApplications', [AdminController::class, 'getResponsibleUserTaskRequests']);
    Route::prefix('applications')->group(function () {
        Route::get('/', [AdminController::class, 'taskRequests'])->name('admin.applications.index');
        Route::get('/{id}', [AdminController::class, 'showTaskRequest'])->name('admin.applications.show');
        Route::post('/{id}', [AdminController::class, 'approveTaskRequest'])->name('admin.applications.approve');
        Route::delete('/{id}', [AdminController::class, 'deleteTaskRequest'])->name('admin.applications.delete');
        Route::put('/{id}/responsibleUser', [AdminController::class, 'updateTaskRequestResponsibleUser'])->name('admin.applications.updateResponsibleUser');
    });

    Route::prefix('tags')->group(function () {
        Route::post('/', [AdminController::class, 'createTag'])->name('admin.tag.create');
        Route::put('/{id}', [AdminController::class, 'updateTag'])->name('admin.tag.update');
        Route::delete('/{id}', [AdminController::class, 'deleteTag'])->name('admin.tag.delete');
    });

    Route::prefix('tasks')->group(function () {
        Route::get('/', [AdminController::class, 'tasks'])->name('admin.tasks.index');
        Route::get('/create', [AdminController::class, 'indexTaskCreate'])->name('admin.tasks.create');
        Route::post('/create', [AdminController::class, 'createTask'])->name('admin.tasks.store');
        Route::get('/settings', [AdminController::class, 'indexTaskSettings'])->name('admin.tasks.settings');
        Route::get('/{id}', [AdminController::class, 'showTask'])->name('admin.tasks.show');
        Route::put('/{id}', [AdminController::class, 'updateTask'])->name('admin.tasks.update');
        Route::post('/{id}/files', [AdminController::class, 'uploadTaskFiles'])->name('admin.tasks.files.upload');
        Route::delete('/{id}', [AdminController::class, 'deleteTask'])->name('admin.tasks.delete');
        Route::delete('/{taskId}/files/{fileId}', [AdminController::class, 'deleteTaskFile'])->name('admin.tasks.files.delete');
    });

    Route::prefix('projects')->group(function () {
        Route::get('/settings', [AdminProjectController::class, 'indexSettings'])->name('admin.projects.settings');
        Route::put('/settings', [AdminProjectController::class, 'updateSettings'])->name('admin.settings.update');

        Route::get('/', [AdminProjectController::class, 'index'])->name('admin.projects.index');
        Route::get('/{id}', [AdminProjectController::class, 'show'])->name('admin.projects.show');
        Route::put('/{id}', [AdminProjectController::class, 'update'])->name('admin.projects.update');
        Route::delete('/{id}', [AdminProjectController::class, 'destroy'])->name('admin.projects.destroy');
        Route::post('/{id}/mentor', [AdminProjectController::class, 'setMentor'])->name('admin.projects.mentor.set');
        Route::delete('/{id}/mentor', [AdminProjectController::class, 'removeMentor'])->name('admin.projects.mentor.remove');
    });

    Route::get('/users', [AdminController::class, 'users'])->name('admin.users.index');
    Route::get('/users/{id}', function () {
        return Inertia::render('admin/User');
    });
});
