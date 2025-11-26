<?php

use App\Http\Controllers\TestRequestController;

Route::get('/test', [TestRequestController::class, 'getTestRequest'])->name('test.request.index');
Route::get('/test/create', [TestRequestController::class, 'createTestRequest'])->name('test.request.create');
Route::get('/test/show/{test}', [TestRequestController::class, 'showTestRequest'])->name('test.request.show');
Route::get('/test/edit/{test}', [TestRequestController::class, 'editTestRequest'])->name('test.request.edit');
Route::put('/test/update/{test}', [TestRequestController::class, 'updateTestRequest'])->name('test.request.update');
Route::post('/test/send/{test}', [TestRequestController::class, 'sendTestRequest'])->name('test.request.send');
Route::post('/test', [TestRequestController::class, 'storeTestRequest'])->name('test.request.store');
