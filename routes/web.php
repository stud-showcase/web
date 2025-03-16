<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('user/Main');
});

Route::get('/projects', function () {
    return Inertia::render('user/Projects');
});

Route::get('/my-projects', function () {
    return Inertia::render('user/Projects');
});

Route::get('/task-bank', function () {
    return Inertia::render('user/TaskBank');
});

Route::get('/profile', function () {
    return Inertia::render('user/Profile');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/Dashboard');
});

Route::get('/admin/requests', function () {
    return Inertia::render('admin/Requests');
});

Route::get('/admin/task-bank', function () {
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
