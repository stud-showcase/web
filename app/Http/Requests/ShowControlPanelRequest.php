<?php

namespace App\Http\Requests;

use App\Traits\AuthorizesProjectActions;
use Illuminate\Foundation\Http\FormRequest;

class ShowControlPanelRequest extends FormRequest
{
    use AuthorizesProjectActions;

    public function authorize(): bool
    {
        // FIXME
        // return $this->authorizeProject($this->route('id'));
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}
