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
}
