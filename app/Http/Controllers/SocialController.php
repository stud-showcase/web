<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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
            abort(404, 'Провайдер не поддерживается');
        };

        try {
            $socialUser = Socialite::driver($provider)->user();
            $userData = $socialUser->user;
            $group = $this->checkGroup($userData['syncable_cohorts']);

            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'id' => $userData['mapping_id'],
                    'first_name' => $userData['first_name'],
                    'second_name' => $userData['family_name'],
                    'last_name' => $userData['middle_name'] ?? '',
                    'group_id' => $group->id,
                ]
            );

            Auth::login($user);

            return redirect('/projects');
        } catch (\Throwable $e) {
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
            return redirect('/')->with('error', 'Ошибка при выходе из системы');
        }
    }

    private function checkGroup(string $groupName)
    {
        $group = Group::where('name', $groupName)->first();

        if (!$group) {
            $group = Group::create([
                'name' => $groupName,
            ]);
        }

        return $group;
    }
}
