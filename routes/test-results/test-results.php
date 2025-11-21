<?php

use App\Http\Controllers\TestResultController;

Route::get('/test-results', [TestResultController::class, 'getTest'])->name('test-results');
Route::get('/test-results/detail/{test}', [TestResultController::class, 'getTestDetail'])
    ->name('test-results.detail');
Route::get('/test-results/{testId}/initial', [TestResultController::class, 'startInitial'])
    ->name('test-results.initial');