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

class UpdateUserRequest extends FormRequest
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
            'name'     => 'required|string|max:255',
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages() {
        return [
            'name.required' => 'nameは必須です。',
            'name.string'   => 'nameは文字列でなければなりません。',
            'name.max'      => 'nameは255文字以内でなければなりません。',
            'email.required' => 'emailは必須です。',
            'email.email'   => 'emailは正しい形式でなければなりません。',
            'password.required' => 'passwordは必須です。',
            'password.string'   => 'passwordは文字列でなければなりません。',
            'password.min'      => 'passwordは6文字以上でなければなりません。',
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
        $errors = $validator->errors()->toArray();
        // エラー内容をログに出力
        $errorMessage = '';
        foreach ($errors as $field => $messages) {
            $errorMessage .= "$field: " . implode(', ', $messages) . "\n";
        }

        Log::info('errorMessage');
        Log::info($errorMessage);

        $response = [
            'status' => 422,
            'message' => array_values($errors)[0][0],
            'errors' => $validator,
        ];

        throw new HttpResponseException(response()->json($response, 422));
    }
}
