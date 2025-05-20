<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\Theme;
use App\Models\Vote;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function top()
    {
        Log::info('Test1');

        $themes = Theme::all();

        foreach ($themes as $theme) {
            Log::info('Theme:', ['id' => $theme->id, 'title' => $theme->title]);
        }

        return Inertia::render('Vote/Top', [
            'themes' => $themes,
        ]);
    }

    public function choice(Request $request, $id)
    {
        $theme = Theme::with('choices')->findOrFail($id);

        return Inertia::render('Vote/[id]/Choice', [
            'theme' => $theme,
            'choices' => $theme->choices,
        ]);
    }

    public function store(Request $request, $id)
{
    $request->validate([
        'choice_id' => 'required|exists:choices,id',
    ]);

    $user = Auth::user();

    // 既に同じテーマに投票しているか確認
    $existingVote = Vote::where('user_id', $user->id)
        ->where('theme_id', $id)
        ->first();

    if ($existingVote) {
        return response()->json(['message' => '既にこのテーマに投票済みです。'], 400);
    }

    // 投票を保存
    Vote::create([
        'user_id' => $user->id,
        'theme_id' => $id,
        'choice_id' => $request->choice_id,
    ]);

    return response()->json(['message' => '投票が完了しました。']);
}

}
