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

    public function update(StoreThemeRequest $request, $id)
    {
        $theme = Theme::findOrFail($id);

        // 作成者のみ更新可能
        if ($theme->user_id !== Auth::id()) {
            abort(403, '権限がありません。');
        }

        $validated = $request->validated();

        $theme->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'deadline' => $validated['deadline'],
        ]);

        // 既存の選択肢を削除して新しい選択肢を保存
        $theme->choices()->delete();
        foreach ($validated['choices'] as $choiceData) {
            $theme->choices()->create(['text' => $choiceData['text']]);
        }

        return redirect()->route('Vote.Top')->with('success', 'テーマが更新されました。');
    }

    public function delete($id)
    {
        $theme = Theme::findOrFail($id);

        // 作成者のみ削除可能
        if ($theme->user_id !== Auth::id()) {
            abort(403, '権限がありません。');
        }

        $theme->delete();

        return redirect()->route('Vote.Top')->with('success', 'テーマが削除されました。');
    }
}
