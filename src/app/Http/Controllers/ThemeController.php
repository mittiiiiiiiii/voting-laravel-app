<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreThemeRequest;
use App\Models\Theme;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class ThemeController extends Controller
{
    public function store(StoreThemeRequest $request)
    {
        Log::info('Test1');

        // 新しいCustomerモデルを作成
        $theme = new Theme();

        // バリデーション済みのデータをモデルに設定
        $theme->fill($request->validated());

        // 現在のユーザーIDを設定
        $theme->user_id = Auth::id();

        // データベースに保存
        $theme->save();

        Log::info('フォームの登録が完了しました。', ['theme' => $theme]);

        $request->session()->regenerate();

        return redirect() -> route('Vote.Top');
    }
}
