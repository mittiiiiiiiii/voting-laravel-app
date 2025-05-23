<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'vote_id' => 'required|exists:votes,id',
            'content' => 'required|string|max:500',
            'parent_id' => 'nullable|exists:comments,id',
        ];
    }

    public function messages(): array
    {
        return [
            'vote_id.required' => '投票IDは必須です。',
            'vote_id.exists' => '指定された投票IDが存在しません。',
            'content.required' => 'コメント内容は必須です。',
            'content.string' => 'コメント内容は文字列で入力してください。',
            'content.max' => 'コメント内容は500文字以内で入力してください。',
            'parent_id.exists' => '指定された親コメントが存在しません。',
        ];
    }
}
