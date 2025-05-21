<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreThemeRequest;
use App\Models\Theme;
use App\Models\Choice;
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

        Log::info('Test2');

        $choices = $request->input('choices', []);

        foreach ($choices as $choiceData) {
            $choice = new Choice();
            $choice->theme_id = $theme->id;
            $choice->text = $choiceData['text'];
            $choice->save();
        }

        Log::info('フォームの登録が完了しました。', ['theme' => $theme]);

        $request->session()->regenerate();

        return redirect() -> route('Vote.Top');
    }

    public function edit($id)
    {
        $theme = Theme::with('choices')->findOrFail($id);

        // 作成者のみ編集可能
        if ($theme->user_id !== Auth::id()) {
            abort(403, '権限がありません。');
        }

        return Inertia::render('Vote/[id]/Edit', [
            'theme' => $theme,
            'choices' => $theme->choices,
        ]);
    }
}
