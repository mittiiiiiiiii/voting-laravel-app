<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        // $credentials = $request->validate([
        //     'email'    => 'required|email',
        //     'password' => 'required|string',
        // ]);

        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();
        //     return redirect() -> route('Tasks');
        // }

        // バリデーションなしver.
        $email = $request->input('email');
        $password = $request->input('password');

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $request->session()->regenerate();
            return redirect()->route('Tasks');
        }

        return back()->withErrors([
            'email' => 'メールアドレスまたはパスワードが正しくありません',
        ])->onlyInput('email');
    }
}
