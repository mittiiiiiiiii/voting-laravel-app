<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'theme_id', 'choice_id', 'parent_id', 'content', 'is_anonymous', 'is_deleted', 'deleted_at'
    ];

    // ユーザー情報
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // リプライ（子コメント）
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // 親コメント
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}
