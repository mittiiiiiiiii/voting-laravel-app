<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function store(StoreUserRequest $request)
    {
        Log::info('Test1');
        Log::info($request->all());
        Log::debug($request->validated());

        // 新しいCustomerモデルを作成
        $user = new User();

        // バリデーション済みのデータをモデルに設定
        $user->fill($request->validated());
        // データベースに保存
        $user->save();

        Log::info('ユーザーの登録が完了しました。', ['user' => $user]);

        event(new Registered($user));
        Auth::login($user);

        $request->session()->regenerate();

        return redirect() -> route('Vote.Top');
    }

    public function login(LoginUserRequest $request){
        Log::info('Test1');

        $user = new User();

        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)){
            Auth::login($user);

            $request->session()->regenerate();

            return redirect()->route('Vote.Top');
        }

        return back()->withErrors([
            'email' => 'メールアドレスまたはパスワードが正しくありません',
        ])->onlyInput('email');
    }
}
