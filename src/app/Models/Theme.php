<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    /** @use HasFactory<\Database\Factories\ThemeFactory> */
    use HasFactory;

    /**
     * モデルで使用するテーブル名
     *
     * @var string
     */
    protected $table = 'themes';

    /**
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'deadline',
        'created_by',
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

    public function choices()
    {
        return $this->hasMany(Choice::class, 'theme_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
