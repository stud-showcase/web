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
        return Socialite::driver($provider)->scopes(['openid', 'profile', 'email'])->redirect();
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        if ($provider !== 'keycloak') {
            abort(404, 'Провайдер не поддерживается');
        }

        try {
            $socialUser = (Socialite::driver($provider)->user())->user;
            $group = $this->checkGroup($socialUser['syncable_cohorts']);

            $user = User::updateOrCreate(
                ['email' => $socialUser['email']],
                [
                    'first_name' => $socialUser['first_name'],
                    'second_name' => $socialUser['family_name'],
                    'last_name' => $socialUser['middle_name'] ?? '',
                    'group_id' => $group->id,
                ]
            );

            Auth::login($user);

            $request->session()->regenerate();

            return redirect('/tasks');
        } catch (\Exception $e) {
            return redirect('/')->with('error', 'Ошибка авторизации: ' . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        $redirectUri = url('/');

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $logoutUrl = env('KEYCLOAK_BASE_URL') . '/realms/' . env('KEYCLOAK_REALM') . '/protocol/openid-connect/logout';
        $query = http_build_query([
            'client_id' => env('KEYCLOAK_CLIENT_ID'),
            'post_logout_redirect_uri' => $redirectUri,
        ]);

        return redirect($logoutUrl . '?' . $query);
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
