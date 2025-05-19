<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Task;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return redirect()->route('Preview');
});

Route::get('/preview', function () {
    return Inertia::render('Preview');
})->name('Preview');
