<?php

use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\TagController as AdminTagController;
use App\Http\Controllers\Admin\TaskRequestController as AdminTaskRequestController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\TaskController as AdminTaskController;
use App\Http\Controllers\Admin\VacancyController as AdminVacancyController;
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
    Route::get('/{provider}/callback', [SocialController::class, 'handleProviderCallback'])->name('social.callback');
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

        Route::post('/{id}/vacancy', [VacancyController::class, 'store'])->name('projects.vacancy.store');
        Route::put('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'update'])->name('projects.vacancy.update');
        Route::delete('/{projectId}/vacancy/{vacancyId}', [VacancyController::class, 'destroy'])->name('projects.vacancy.destroy');

        Route::put('/{projectId}/member/{memberId}', [ProjectController::class, 'updateMember'])->name('projects.member.update');
        Route::delete('/{projectId}/member/{memberId}', [ProjectController::class, 'deleteMember'])->name('projects.member.delete');
    });
});

Route::prefix('admin')->middleware(['auth', 'role:mentor,admin'])->group(function () {
    Route::get('/myApplications', [AdminTaskRequestController::class, 'responsible'])->name('admin.myApplications');
    Route::prefix('applications')->group(function () {
        Route::get('/', [AdminTaskRequestController::class, 'index'])->name('admin.applications.index');
        Route::get('/{id}', [AdminTaskRequestController::class, 'show'])->name('admin.applications.show');
        Route::delete('/{id}', [AdminTaskRequestController::class, 'destroy'])->name('admin.applications.destroy');
        Route::post('/{id}', [AdminTaskRequestController::class, 'approve'])->name('admin.applications.approve');
        Route::put('/{id}/responsible', [AdminTaskRequestController::class, 'updateResponsible'])->name('admin.applications.responsible.update');
    });

    Route::prefix('tags')->middleware('role:admin')->group(function () {
        Route::post('/', [AdminTagController::class, 'store'])->name('admin.tags.store');
        Route::put('/{id}', [AdminTagController::class, 'update'])->name('admin.tags.update');
        Route::delete('/{id}', [AdminTagController::class, 'destroy'])->name('admin.tags.destroy');
    });

    Route::prefix('tasks')->group(function () {
        Route::get('/', [AdminTaskController::class, 'index'])->name('admin.tasks.index');
        Route::get('/settings', [AdminTaskController::class, 'indexSettings'])->name('admin.tasks.settings');
        Route::get('/create', [AdminTaskController::class, 'create'])->name('admin.tasks.create');
        Route::get('/{id}', [AdminTaskController::class, 'show'])->name('admin.tasks.show');

        Route::middleware('role:admin')->group(function () {
            Route::get('/create', [AdminTaskController::class, 'create'])->name('admin.tasks.create');
            Route::post('/', [AdminTaskController::class, 'store'])->name('admin.tasks.store');
            Route::put('/{id}', [AdminTaskController::class, 'update'])->name('admin.tasks.update');
            Route::delete('/{id}', [AdminTaskController::class, 'destroy'])->name('admin.tasks.destroy');
            Route::post('/{id}/files', [AdminTaskController::class, 'uploadFiles'])->name('admin.tasks.files.upload');
            Route::delete('/{taskId}/files/{fileId}', [AdminTaskController::class, 'deleteFile'])->name('admin.tasks.files.destroy');
        });

        Route::get('/', [AdminTaskController::class, 'index'])->name('admin.tasks.index');
        Route::get('/{id}', [AdminTaskController::class, 'show'])->name('admin.tasks.show');
    });

    Route::prefix('projects')->group(function () {
        Route::get('/settings', [AdminProjectController::class, 'indexSettings'])->middleware('role:admin')->name('admin.projects.settings');
        Route::middleware('role:admin')->group(function () {
            Route::put('/settings', [AdminProjectController::class, 'updateSettings'])->middleware('role:admin')->name('admin.projects.settings.update');
        });

        Route::get('/', [AdminProjectController::class, 'index'])->name('admin.projects.index');
        Route::get('/{id}', [AdminProjectController::class, 'show'])->name('admin.projects.show');
        Route::post('/', [AdminProjectController::class, 'store'])->name('admin.projects.store');
        Route::put('/{id}', [AdminProjectController::class, 'update'])->name('admin.projects.update');
        Route::delete('/{id}', [AdminProjectController::class, 'destroy'])->name('admin.projects.destroy');
        Route::post('/{id}/mentor', [AdminProjectController::class, 'setMentor'])->name('admin.projects.mentor.set');
        Route::delete('/{id}/mentor', [AdminProjectController::class, 'removeMentor'])->name('admin.projects.mentor.remove');

        Route::post('/{id}/files', [AdminProjectController::class, 'uploadFiles'])->name('admin.projects.files.upload');
        Route::delete('/{projectId}/files/{fileId}', [AdminProjectController::class, 'deleteFile'])->name('admin.projects.files.delete');

        Route::post('/{id}/vacancy', [AdminVacancyController::class, 'store'])->name('admin.projects.vacancy.create');
        Route::put('/{projectId}/vacancy/{vacancyId}', [AdminVacancyController::class, 'update'])->name('admin.projects.vacancy.update');
        Route::delete('/{projectId}/vacancy/{vacancyId}', [AdminVacancyController::class, 'destroy'])->name('admin.projects.vacancy.destroy');

        Route::put('/{projectId}/member/{memberId}', [AdminProjectController::class, 'updateMember'])->name('admin.projects.member.update');
        Route::delete('/{projectId}/member/{memberId}', [AdminProjectController::class, 'deleteMember'])->name('admin.projects.member.delete');
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [AdminUserController::class, 'index'])->name('admin.users.index');
        Route::get('/{id}', [AdminUserController::class, 'show'])->name('admin.users.show');

        Route::middleware('role:admin')->group(function () {
            Route::put('/{id}', [AdminUserController::class, 'update'])->name('admin.users.update');
            Route::delete('/{id}', [AdminUserController::class, 'destroy'])->middleware('role:admin')->name('admin.users.destroy');
        });
    });
});
