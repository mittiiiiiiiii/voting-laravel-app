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

Route::get('/', function () {
    return redirect()->route('Login');
});

Route::get('/preview', function () {
    return Inertia::render('Preview');
})->name('Preview');

Route::prefix('auth')->group(function () {
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('Register');

    Route::post('/register', [UserController::class, 'store']);

    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('Login');

    Route::post('/login', [UserController::class, 'login']);
});

Route::prefix('vote')->group(function () {
    Route::get('/top', [VoteController::class, 'top'])->name('Vote.Top');
});
