<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;
use DateTime;
use App\Rules\Recaptcha;
use function Laravel\Prompts\error;
use Inertia\Inertia;

class StoreThemeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
      //本番環境では条件を付けてtrueを返すように変更
        return true;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            //$customer = $this->route('customer');

        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date|after:now',
            'choices' => 'required|array|min:1',
            'choices.*.text' => 'required|string|max:255',
        ];
    }

    public function messages() {
        return [
            'title.required' => 'タイトルは必須です。',
            'title.string'   => 'タイトルは文字列で入力してください。',
            'title.max'      => 'タイトルは255文字以内で入力してください。',
            'description.string' => '説明は文字列で入力してください。',
            'deadline.date'  => '締切は有効な日付形式で入力してください。',
            'deadline.after' => '締切は現在時刻以降に設定してください。',
            'choices.required' => '選択肢は少なくとも1つ必要です。',
            'choices.array' => '選択肢は配列形式で入力してください。',
            'choices.min' => '選択肢は少なくとも1つ必要です。',
            'choices.*.text.required' => '各選択肢のテキストは必須です。',
            'choices.*.text.string' => '各選択肢のテキストは文字列で入力してください。',
            'choices.*.text.max' => '各選択肢のテキストは255文字以内で入力してください。',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        if ($this->expectsJson()) {
            // Inertiaリクエストの場合はInertiaのエラーリダイレクト
            if ($this->header('X-Inertia')) {
                throw new HttpResponseException(
                    redirect()->back()->withErrors($errors, $this->errorBag)->withInput()
                );
            }
            // 通常のAPIリクエストの場合はJSON
            throw new HttpResponseException(
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
