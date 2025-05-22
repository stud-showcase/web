<?php

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

Route::prefix('auth')->middleware('guest')->group(function () {
    Route::get('/{provider}/redirect', [SocialController::class, 'redirectToProvider'])->name('login');
    Route::get('/{provider}/callback', [SocialController::class, 'handleProviderCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/myProjects', [ProjectController::class, 'getUserProjects']);
    Route::get('/logout', [SocialController::class, 'logout'])->name('logout');
});

Route::get('/download/{path}', [FileController::class, 'download'])->name('files.download')->where('path', '.*');

Route::get('/vacancies', [VacancyController::class, 'index']);
Route::get('/application', function () {
    return Inertia::render('user/Application');
});

Route::post('/application', [TaskController::class, 'createRequest']);

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index'])->name('tasks.index');
    Route::get('/{id}', [TaskController::class, 'show']);
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
        Route::delete('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'delete'])->name('projects.vacancy.delete');

        Route::put('/{projectId}/member/{memberId}', [ProjectController::class, 'updateMember'])->name('projects.member.update');
        Route::delete('/{projectId}/member/{memberId}', [ProjectController::class, 'deleteMember'])->name('projects.member.delete');
    });
});

Route::prefix('admin')->middleware(['auth', 'role:mentor,admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    });

    Route::get('/applications', [AdminController::class, 'taskRequests'])->name('admin.applications.index');
    Route::get('/myApplications', [AdminController::class, 'getResponsibleUserTaskRequests']);
    Route::get('/applications/{id}', [AdminController::class, 'showTaskRequest'])->name('admin.applications.show');
    Route::post('/applications/{id}', [AdminController::class, 'approveTaskRequest'])->name('admin.applications.approve');
    Route::delete('/applications/{id}', [AdminController::class, 'deleteTaskRequest'])->name('admin.applications.delete');
    Route::put('/applications/{id}/responsibleUser', [AdminController::class, 'updateTaskRequestResponsibleUser'])->name('admin.applications.updateResponsibleUser');

    Route::get('/tasks', [AdminController::class, 'tasks'])->name('admin.tasks.index');
    Route::get('/tasks/create', [AdminController::class, 'indexTaskCreate'])->name('admin.tasks.create');
    Route::post('/tasks/create', [AdminController::class, 'createTask'])->name('admin.tasks.store');
    Route::get('/tasks/{id}', [AdminController::class, 'showTask'])->name('admin.tasks.show');

    Route::get('/projects', [AdminController::class, 'projects'])->name('admin.projects.index');
    Route::get('/projects/{id}', function () {
        return Inertia::render('admin/Project');
    });

    Route::get('/users', [AdminController::class, 'users'])->name('admin.users.index');
    Route::get('/users/{id}', function () {
        return Inertia::render('admin/User');
    });

    Route::get('/vacancies', [AdminController::class, 'vacancies'])->name('admin.vacancies.index');
    Route::get('/vacancies/{id}', function () {
        return Inertia::render('admin/Vacancy');
    });
});
