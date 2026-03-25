<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Thêm đoạn này để ép dùng HTTPS trên môi trường production (Vercel)
        if (config('app.env') === 'production') {
            \URL::forceScheme('https');
        }
    }
}
