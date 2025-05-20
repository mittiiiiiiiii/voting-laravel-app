<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    use HasFactory;

    /**
     * モデルで使用するテーブル名
     *
     * @var string
     */
    protected $table = 'choices';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'theme_id',
        'text',
    ];

    /**
     * @var list<string>
     */
    protected $hidden = [
        // 必要に応じて隠す属性を追加
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function theme()
    {
        return $this->belongsTo(Theme::class, 'theme_id');
    }
}
