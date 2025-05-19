<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        // ログインユーザーのタスク一覧取得
        $user = $request->user();
        $tasks = Task::where('user_id', $user->id)->orderBy('due_date', 'asc')->get();

        return Inertia::render('Tasks/page', [
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $task = Task::create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'due_date' => $request->input('due_date'),
            'status' => $request->input('status'),
            'user_id' => $user->id,
        ]);

        return redirect()->route('Tasks');
    }

    public function delete(Request $request, $id)
    {
        $user = $request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->first();
        if ($task) {
            $task->delete();
            return redirect()->route('Tasks')->with('success', 'タスクを削除しました');
        }
        return redirect()->route('Tasks')->with('error', 'タスクが見つかりません');
    }

    public function edit(Request $request, $id)
    {
        $user = $request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        return Inertia::render('Tasks/[id]/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = $request->user();
        $task = Task::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $task->update([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'due_date' => $request->input('date'),
            'status' => $request->input('status'),
        ]);

        return redirect()->route('Tasks')->with('success', 'タスクを更新しました');
    }
}
