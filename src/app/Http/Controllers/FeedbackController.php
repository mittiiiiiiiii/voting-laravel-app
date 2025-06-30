<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use App\Http\Requests\StoreFeedbackRequest;

class FeedbackController extends Controller
{
    public function store(StoreFeedbackRequest $request)
    {
        $validated = $request->validated();

        $feedback = new Feedback();
        $feedback->title = $validated['title'];
        $feedback->category = $validated['category'];
        $feedback->description = $validated['description'];
        $feedback->email = $validated['email'] ?? null;
        $feedback->save();

        // フィードバック送信後は投票トップへリダイレクト
        return redirect()->route('Vote.Top')->with('success', 'フィードバックを受け付けました。');
    }
}
