<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return route('login', Authenticate::DEFAULT_AUTH_PROVIDER);
        }

        $user = Auth::user();

        if ($user->hasAnyRole($roles)) {
            return $next($request);
        }

        abort(403, 'Нет доступа');
    }
}
