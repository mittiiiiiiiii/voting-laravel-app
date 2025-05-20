<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class StoreVoteRequest extends FormRequest
{
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
            'choice_id' => 'required|exists:choices,id',
        ];
    }

    public function messages(): array
    {
        return [
            'choice_id.required' => '選択肢は必須です。',
            'choice_id.exists'   => '選択された選択肢が無効です。',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors()->toArray();

        $errorMessage = '';
        foreach ($errors as $field => $messages) {
            $errorMessage .= "$field: " . implode(', ', $messages) . "\n";
        }

        Log::error('Validation Error:', ['errors' => $errorMessage]);

        $response = [
            'status' => 422,
            'message' => array_values($errors)[0][0],
            'errors' => $validator->errors(),
        ];

        throw new HttpResponseException(response()->json($response, 422));
    }
}
