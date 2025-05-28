<?php

namespace App\Http\Requests\Admin;

use App\Models\TaskRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class DeleteTaskRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $taskRequest = TaskRequest::find($this->route('id'));
        return Auth::user()->hasAnyRole('admin') || ($taskRequest && Auth::id() == $taskRequest->responsible_user_id);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
