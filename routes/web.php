<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialController;
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

Route::get('/projects', function () {
    return Inertia::render('user/Projects');
});

Route::get('/projects/{id}', function () {
    return Inertia::render('user/Project');
});

Route::get('/tasks', function () {
    return Inertia::render('user/TaskBank');
});

Route::get('/tasks/{id}', function ($id) {
    return Inertia::render('user/Task', ["id" => $id]);
});

Route::get('/vacancies', function () {
    return Inertia::render('user/Vacancies');
});

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    });

    Route::get('/requests', function () {
        return Inertia::render('admin/Requests');
    });

    Route::get('/tasks', function () {
        return Inertia::render('admin/TaskBank');
    });

    Route::get('/projects', function () {
        return Inertia::render('admin/Projects');
    });

    Route::get('/users', function () {
        return Inertia::render('admin/Users');
    });

    Route::get('/vacancies', function () {
        return Inertia::render('admin/Vacancies');
    });
});
