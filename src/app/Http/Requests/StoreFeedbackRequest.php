<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFeedbackRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'email' => 'sometimes|nullable|email|max:255',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'タイトルは必須です。',
            'title.string'   => 'タイトルは文字列で入力してください。',
            'title.max'      => 'タイトルは255文字以内で入力してください。',
            'category.required' => '目的は必須です。',
            'category.string'   => '目的は文字列で入力してください。',
            'category.max'      => '目的は255文字以内で入力してください。',
            'description.required' => '概要は必須です。',
            'description.string'   => '概要は文字列で入力してください。',
            'email.email'      => 'メールアドレスの形式が正しくありません。',
            'email.max'        => 'メールアドレスは255文字以内で入力してください。',
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $errors = $validator->errors();

        if ($this->expectsJson()) {
            if ($this->header('X-Inertia')) {
                throw new \Illuminate\Http\Exceptions\HttpResponseException(
                    redirect()->back()->withErrors($errors, $this->errorBag)->withInput()
                );
            }
            throw new \Illuminate\Http\Exceptions\HttpResponseException(
                response()->json([
                    'status' => 422,
                    'message' => $errors->first(),
                    'errors' => $errors,
                ], 422)
            );
        }

        parent::failedValidation($validator);
    }
}
