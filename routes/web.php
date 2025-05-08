<?php

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
        Route::post('/invite-request', [ProjectController::class, 'createInvite'])->name('projects.invite.request');
        Route::post('/accept-invite', [ProjectController::class, 'acceptInvite'])->name('projects.invite.accept');
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

    Route::get('/applications', function () {
        return Inertia::render('admin/Applications');
    });

    Route::get('/applications/{id}', function () {
        return Inertia::render('admin/Application');
    });

    Route::get('/tasks', function () {
        return Inertia::render('admin/TaskBank');
    });

    Route::get('/tasks/{id}', function () {
        return Inertia::render('admin/Task');
    });

    Route::get('/projects', function () {
        return Inertia::render('admin/Projects');
    });

    Route::get('/projects/{id}', function () {
        return Inertia::render('admin/Project');
    });

    Route::get('/users', function () {
        return Inertia::render('admin/Users');
    });

    Route::get('/users/{id}', function () {
        return Inertia::render('admin/User');
    });

    Route::get('/vacancies', function () {
        return Inertia::render('admin/Vacancies');
    });

    Route::get('/vacancies/{id}', function () {
        return Inertia::render('admin/Vacancy');
    });
});
