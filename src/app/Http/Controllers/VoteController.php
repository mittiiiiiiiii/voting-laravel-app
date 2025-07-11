<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreVoteRequest;
use App\Models\Theme;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;

class VoteController extends Controller
{
    public function top()
    {
        Log::info('Test1');

        $now = Carbon::now();

        // 期限が過ぎたテーマを取得して更新
        $expiredThemes = Theme::where('deadline', '<', $now)
            ->where('is_closed', false)
            ->update(['is_closed' => true]);

        Log::info("期限が過ぎたテーマを終了しました: {$expiredThemes} 件");

        $themes = Theme::orderBy('deadline', 'asc')->get();

        foreach ($themes as $theme) {
            Log::info('Theme:', ['id' => $theme->id, 'title' => $theme->title]);
        }

        $user = Auth::user();
        Log::info('ログインユーザー:', ['user' => $user]);

        return Inertia::render('Vote/Top', [
            'themes' => $themes,
            'authUserId' => Auth::id(),
        ]);
    }

    public function choice($id)
    {
        $theme = Theme::with('choices')->findOrFail($id);

        $isclosed = $theme->is_closed;
        if ($isclosed) {
            return redirect()->route('Vote.Result', ['id' => $id]);
        }

        $user = Auth::user();

        // 既に投票済みか確認
        $existingVote = Vote::where('user_id', $user->id)
            ->where('theme_id', $id)
            ->first();

        if ($existingVote) {
            return redirect()->route('Vote.Result', ['id' => $id]);
        }

        return Inertia::render('Vote/[id]/Choice', [
            'theme' => $theme,
            'choices' => $theme->choices,
        ]);
    }

    public function store(StoreVoteRequest $request, $id)
    {
        $request->validate([
            'choice_id' => 'required|exists:choices,id',
        ]);

        $user = Auth::user();

        $vote = new Vote();
        $vote->user_id = $user->id;
        $vote->theme_id = $id;
        $vote->choice_id = $request->choice_id;
        $vote->save();

        // コメントがあれば保存
        if ($request->filled('comment_content')) {
            Comment::create([
                'user_id' => $user->id,
                'theme_id' => $id,
                'choice_id' => $request->choice_id,
                'content' => $request->comment_content,
                'is_anonymous' => $request->boolean('is_anonymous', false),
            ]);
        }

        return redirect()->route('Vote.Result',['id' => $id]);
    }

}
