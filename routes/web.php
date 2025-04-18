<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('user/Main');
});

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');

Route::prefix('auth')->middleware('guest')->group(function () {
    Route::get('/{provider}/redirect', [SocialController::class, 'redirectToProvider'])->name('login');
    Route::get('/{provider}/callback', [SocialController::class, 'handleProviderCallback']);
});

// Route::middleware('auth')->group(function () {
    Route::get('/tasks', function () {
        return Inertia::render('user/TaskBank');
    });

    Route::get('/tasks/{id}', function ($id) {
        return Inertia::render('user/Task', ["id" => $id]);
    });

    Route::get('/vacancies', function() {
        return Inertia::render('user/Vacancies');
    });

    Route::get('/admin/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    });

    Route::get('/admin/requests', function () {
        return Inertia::render('admin/Requests');
    });

    Route::get('/admin/tasks', function () {
        return Inertia::render('admin/TaskBank');
    });

    Route::get('/admin/projects', function () {
        return Inertia::render('admin/Projects');
    });

    Route::get('/admin/users', function () {
        return Inertia::render('admin/Users');
    });

    Route::get('/admin/analytics', function () {
        return Inertia::render('admin/Analytics');
    });

    Route::post('/auth/{provider}/logout', [SocialController::class, 'logout'])->name('logout');
// });
