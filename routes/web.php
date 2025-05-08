<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::prefix('auth')->middleware('guest')->group(function () {
    Route::get('/{provider}/redirect', [SocialController::class, 'redirectToProvider'])->name('login');
    Route::get('/{provider}/callback', [SocialController::class, 'handleProviderCallback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', [SocialController::class, 'logout'])->name('logout');
});

Route::get('/', function () {
    return Inertia::render('user/Main');
});

Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/{id}', [ProjectController::class, 'show'])->name('projects.show');

    Route::middleware('auth')->group(function () {
        Route::post('/', [ProjectController::class, 'store'])->name('projects.store');
        Route::put('/{id}', [ProjectController::class, 'update'])->name('projects.update');
        Route::post('/{id}/files', [ProjectController::class, 'uploadFiles'])->name('projects.files.upload');

        Route::post('/invite-request', [ProjectController::class, 'createInvite'])->name('projects.invite.request');
        Route::post('/accept-invite', [ProjectController::class, 'acceptInvite'])->name('projects.invite.accept');

        Route::post('/{id}/vacancy', [VacancyController::class, 'store'])->name('projects.vacancy.create');
        Route::put('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'update'])->name('projects.vacancy.update');
        Route::delete('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'delete'])->name('projects.vacancy.delete');
    });
});

Route::prefix('tasks')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::get('/{id}', [TaskController::class, 'show']);
});

Route::post('/taskRequest', [TaskController::class, 'createRequest']);

Route::get('/download/{path}', [FileController::class, 'download'])->name('files.download')->where('path', '.*');

Route::get('/vacancies', [VacancyController::class, 'index']);

Route::prefix('admin')->middleware(['auth', 'role:mentor,admin'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    });

    Route::get('/applications', [AdminController::class, 'taskRequests'])->name('admin.applications.index');
    Route::get('/applications/{id}', function () {
        return Inertia::render('admin/Application');
    });

    Route::get('/tasks', function () {
        return Inertia::render('admin/TaskBank');
    });

    Route::get('/tasks/{id}', function () {
        return Inertia::render('admin/Task');
    });

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
