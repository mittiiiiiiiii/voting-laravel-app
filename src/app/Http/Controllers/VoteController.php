<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\Theme;
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

}
