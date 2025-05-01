<?php

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

Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/tasks', [TaskController::class, 'index']);

Route::get('/tasks/{id}', [TaskController::class, 'show']);

Route::get('/vacancies', [VacancyController::class, 'index']);

Route::prefix('admin')->middleware('auth')->group(function () {
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
