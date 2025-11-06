<?php
use App\Http\Controllers\TestRequestController;

Route::get('/test', [TestRequestController::class, 'getTestRequest'])->name('test.request.index');
Route::get('/test/create', [TestRequestController::class, 'createTestRequest'])->name('test.request.create');
Route::get('/test/show/{test}', [TestRequestController::class, 'showTestRequest'])->name('test.request.show');
Route::get('/test/edit', [TestRequestController::class, 'editTestRequest'])->name('test.request.edit');
