<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Test1');

        // $validated = $request->validate([
        //     'name'     => 'required|string|max:255',
        //     'email'    => 'required|email|unique:users,email',
        //     'password' => 'required|string|min:6',
        // ]);

        // $name = $request->input('name');
        // $email = $request->input('email');
        // $password = $request->input('password');

        // Log::info('Test2');

        // $user = User::create([
        //     'name'     => $validated['name'],
        //     'email'    => $validated['email'],
        //     'password' => Hash::make($validated['password']),
        // ]);

        // バリデーションなしver.
        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
        ]);

        // return redirect(route('Login'));
        return redirect() -> route('Login');
    }
}
