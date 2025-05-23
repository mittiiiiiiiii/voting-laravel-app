<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Requests\StoreCommentRequest;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request)
    {

        Comment::create([
            'vote_id' => $request->input('vote_id'),
            'content' => $request->input('content'),
            'parent_id' => $request->input('parent_id'),
        ]);

        return redirect()->back()->with('success', 'コメントを投稿しました。');
    }
}
