<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Пока тут мок данные
        return [
            ...parent::share($request),
            'auth' => [
                'isLoggedIn' => true,
                'user' => [
                    'role' => 'admin',
                    'firstName' => 'Иван',
                    'lastName' => 'Иванов',
                    'middleName' => 'Иванович'
                ]
            ],
        ];

        $user = Auth::user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'firstName' => $user->first_name,
                    'lastName' => $user->second_name,
                    'middleName' => $user->last_name,
                    'email' => $user->email,
                ] : null,
            ],
        ];
    }
}
