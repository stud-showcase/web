<?php

namespace Tests\Feature\Controllers;

use App\Models\User;
use App\Services\FileService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Tests\TestCase;
use Mockery;

class FileControllerTest extends TestCase
{
    protected $fileService;
    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->fileService = Mockery::mock(FileService::class);
        $this->app->instance(FileService::class, $this->fileService);
        /** @var \App\Models\User $user */
        $this->user = User::factory()->create();
        $this->actingAs($this->user);
        Storage::fake('public');
    }

    public function test_download_returns_file_response()
    {
        $path = 'task_files/1/document.pdf';
        $file = ['id' => 1, 'name' => 'document.pdf', 'path' => $path];

        Storage::disk('public')->put($path, 'Test content');

        $response = new BinaryFileResponse(Storage::disk('public')->path($path));
        $response->headers->set('Content-Disposition', 'attachment; filename="' . $file['name'] . '"');

        $this->fileService->shouldReceive('download')
            ->with($path)
            ->andReturn($response);

        $response = $this->get(route('files.download', ['path' => $path]));

        $response->assertOk()
            ->assertHeader('Content-Disposition', 'attachment; filename="' . $file['name'] . '"');
    }

    public function test_download_returns_404_when_file_not_found()
    {
        $path = 'task_files/1/nonexistent.pdf';

        $this->fileService->shouldReceive('download')
            ->with($path)
            ->andReturnUsing(function () use ($path) {
                Log::warning("Файл не найден по пути: [$path]");
                abort(404, 'Файл не найден');
            });

        Log::shouldReceive('warning')->once();

        $response = $this->get(route('files.download', ['path' => $path]));

        $response->assertNotFound();
    }

    public function test_download_returns_403_on_invalid_argument()
    {
        $path = 'task_files/1/restricted.pdf';

        $this->fileService->shouldReceive('download')
            ->with($path)
            ->andReturnUsing(function () use ($path) {
                Log::error("Ошибка скачивания файла по пути [$path]: Forbidden");
                abort(403, 'Forbidden');
            });

        Log::shouldReceive('error')->once();

        $response = $this->get(route('files.download', ['path' => $path]));

        $response->assertForbidden();
    }

    public function test_download_returns_500_on_server_error()
    {
        $path = 'task_files/1/error.pdf';

        $this->fileService->shouldReceive('download')
            ->with($path)
            ->andReturnUsing(function () use ($path) {
                Log::error("Ошибка скачивания файла по пути [$path]: Server error");
                abort(500, 'Ошибка сервера');
            });

        Log::shouldReceive('error')->once();

        $response = $this->get(route('files.download', ['path' => $path]));

        $response->assertStatus(500);
    }
}
