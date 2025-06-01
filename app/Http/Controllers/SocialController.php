<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class SocialController extends Controller
{
    public function redirectToProvider(Request $request, $provider)
    {
        if ($provider !== 'keycloak') {
            abort(404, 'Провайдер не поддерживается');
        }
        return Socialite::driver($provider)->with(['prompt' => 'login'])->redirect();
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        if ($provider !== 'keycloak') {
            Log::error('Не поддерживаемый провайдер: ' . $provider);
            abort(404, 'Провайдер не поддерживается');
        };

        try {
            $socialUser = Socialite::driver($provider)->user();
            $userData = $socialUser->user;

            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'id' => $userData['mapping_id'],
                    'first_name' => $userData['first_name'],
                    'second_name' => $userData['family_name'],
                    'last_name' => $userData['middle_name'] ?? '',
                    'group' => $userData['syncable_cohorts'] ?? '',
                ]
            );

            $shouldInvalidateCache = $user->wasRecentlyCreated || $user->wasChanged();

            if ($user->roles()->count() === 0) {
                $studentRole = Role::where('name', 'student')->firstOrFail();
                $user->roles()->attach($studentRole->id);
                $shouldInvalidateCache = true;
            }

            if ($shouldInvalidateCache) {
                Cache::tags(['users'])->flush();
            }

            Auth::login($user);

            return redirect('/projects');
        } catch (Throwable $e) {
            Log::error('Ошибка авторизации: ' . $e->getMessage());
            return redirect('/')->with('error', 'Ошибка авторизации: ' . $e->getMessage());
        }
    }

    public function logout()
    {
        try {
            Auth::logout();

            $logoutUri = env('KEYCLOAK_BASE_URL') . '/realms/' . env('KEYCLOAK_REALM') . '/protocol/openid-connect/logout';
            $query = http_build_query([
                'client_id' => env('KEYCLOAK_CLIENT_ID'),
                'post_logout_redirect_uri' => env('APP_URL') . '/',
            ]);
            return redirect($logoutUri . '?' . $query);
        } catch (\Throwable $e) {
            Log::error('Ошибка при выходе из системы: ' . $e->getMessage(), ['exception' => $e]);
            return redirect('/')->with('error', 'Ошибка при выходе из системы');
        }
    }
}
