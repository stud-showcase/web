<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main');
});

Route::get('/projects', function () {
    return Inertia::render('Projects');
});

Route::get('/task-bank', function () {
    return Inertia::render('TaskBank');
});

Route::get('/profile', function () {
    return Inertia::render('Profile');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('Dashboard');
});

