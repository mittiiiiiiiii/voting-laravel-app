<?php

namespace App\Console\Commands;
use App\Models\Theme;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

use Illuminate\Console\Command;

class CloseExpiredThemes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'themes:close-expired';
    protected $description = '期限が過ぎたテーマを終了状態にする';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now(); // 現在時刻を取得

        Log::info('現在時刻: ' . $now);

        // 期限が過ぎたテーマを取得してログに出力
        $expiredThemes = Theme::where('deadline', '<', $now)
            ->where('is_closed', false)
            ->get();

        Log::info('期限が過ぎたテーマ:', $expiredThemes->toArray());

        // 期限が過ぎたテーマを取得して更新
        $expiredThemes = Theme::where('deadline', '<', $now)
            ->where('is_closed', false)
            ->update(['is_closed' => true]);

        $this->info("期限が過ぎたテーマを終了しました: {$expiredThemes} 件");
    }
}
