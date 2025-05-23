<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'vote_id' => 'required|exists:votes,id',
            'content' => 'required|string|max:500',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        Comment::create([
            'vote_id' => $request->input('vote_id'),
            'content' => $request->input('content'),
            'parent_id' => $request->input('parent_id'),
        ]);

        return redirect()->back()->with('success', 'コメントを投稿しました。');
    }
}
