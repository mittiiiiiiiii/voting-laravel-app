<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();
        return Inertia::render('Profile', [
            'user' => $user,
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password') ? bcrypt($request->input('password')) : $user->password,
        ]);

        return redirect()->route('Tasks')->with('success', 'プロフィールを更新しました');
    }
}
