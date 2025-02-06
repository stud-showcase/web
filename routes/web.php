<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Main');
});

Route::get('/projects', function () {
    return Inertia::render('Projects');
});
