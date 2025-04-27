<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;


class Authenticate extends Middleware
{
    public const DEFAULT_AUTH_PROVIDER = 'keycloak';

    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('login', self::DEFAULT_AUTH_PROVIDER);
    }
}
