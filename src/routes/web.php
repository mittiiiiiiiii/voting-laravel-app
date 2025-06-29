<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\ThemeController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/preview', function () {
    return Inertia::render('Preview');
})->name('Preview');

Route::prefix('form')->group(function () {
    Route::get('/contact', function () {
        return Inertia::render('Form/FeedbackForm');
    })->name('contact');
});

Route::prefix('auth')->group(function () {
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('Register');

    Route::post('/register', [UserController::class, 'store']);

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::post('/login', [UserController::class, 'login']);

    Route::get('/profile', [UserController::class, 'edit'])->name('Profile.edit');

    Route::post('/profile', [UserController::class, 'update'])->name('Profile.update');

    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
});

Route::middleware(['auth'])->group(function () {
    Route::prefix('vote')->group(function () {
        Route::get('/top', [VoteController::class, 'top'])->name('Vote.Top');

        Route::get('/new', function () {
            return Inertia::render('Vote/New');
        })->name('Vote.New');

        Route::post('/new', [ThemeController::class, 'store']);

        Route::get('/{id}/choice', [VoteController::class, 'choice'])->name('Vote.Choice');

        Route::post('/{id}/choice', [VoteController::class, 'store'])->name('Vote.Store');

        Route::get('/{id}/result', [ThemeController::class, 'Result'])->name('Vote.Result');

        Route::get('/{id}/edit', [ThemeController::class, 'edit'])->name('Vote.Edit');

        Route::post('/{id}/edit', [ThemeController::class, 'update'])->name('Vote.Update');

        Route::post('/{id}/delete', [ThemeController::class, 'delete'])->name('Vote.Update');
    });
});
