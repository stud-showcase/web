<?php

namespace App\Providers;

use App\Services\ProjectService;
use App\Repositories\ProjectRepository;
use Illuminate\Foundation\Support\Providers\EventServiceProvider;
use Illuminate\Support\Facades\Vite;
use SocialiteProviders\Keycloak\Provider;
use SocialiteProviders\Manager\SocialiteWasCalled;

class AppServiceProvider extends EventServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProjectRepository::class, function () {
            return new ProjectRepository();
        });

        $this->app->bind(ProjectService::class, function ($app) {
            return new ProjectService(
                $app->make(ProjectRepository::class)
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        \Event::listen(function (SocialiteWasCalled $event) {
            $event->extendSocialite('keycloak', Provider::class);
        });
    }
}
