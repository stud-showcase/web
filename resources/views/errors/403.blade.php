<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Ошибка 403</title>
        @vite('resources/css/app.css')
    </head>
    <body
        class="flex items-center justify-center h-screen bg-gradient-to-r from-primary to-blue-800 overflow-hidden relative"
    >
        <div class="absolute inset-0 backdrop-blur-md"></div>
        <div
            class="relative z-10 text-center max-w-xl p-10 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20"
        >
            <h1
                class="text-9xl font-extrabold text-white tracking-widest drop-shadow-lg"
            >
                403
            </h1>
            <p class="text-3xl font-bold mt-6 text-white">Доступ запрещен</p>
            <p class="text-md text-white/80 mt-4">
                У вас нет прав для просмотра этой страницы. Попробуйте
                авторизоваться или обратитесь к администратору.
            </p>
            <div class="mt-8 flex justify-center gap-6">
                <a
                    href="/"
                    class="px-6 py-3 text-lg font-bold text-white bg-primary rounded-lg hover:bg-opacity-80 transition-all shadow-md hover:shadow-lg"
                >
                    На главную
                </a>
            </div>
        </div>
    </body>
</html>
