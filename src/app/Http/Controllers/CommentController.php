<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    /**
     * 指定テーマのコメント一覧を取得
     */
    public function index(Request $request)
    {
        $themeId = $request->input('theme_id');
        if (!$themeId) {
            return response()->json(['error' => 'theme_id is required'], 400);
        }

        $comments = Comment::with(['user:id,name', 'replies.user:id,name'])
            ->where('theme_id', $themeId)
            ->whereNull('parent_id')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($comments);
    }

    /**
     * コメントを保存
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'theme_id' => 'required|integer|exists:themes,id',
            'is_anonymous' => 'boolean',
            'parent_id' => 'nullable|integer|exists:comments,id',
        ]);

        $comment = new Comment();
        $comment->user_id = auth()->id();
        $comment->theme_id = $validated['theme_id'];
        $comment->content = $validated['content'];
        $comment->is_anonymous = $validated['is_anonymous'] ?? false;
        $comment->parent_id = $validated['parent_id'] ?? null;
        $comment->save();

        // ユーザー情報も返す
        $comment->load('user:id,name', 'replies.user:id,name');

        return response()->json($comment, 201);
    }
}
