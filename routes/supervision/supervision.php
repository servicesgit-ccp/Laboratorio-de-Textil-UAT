<?php

use App\Http\Controllers\SupervisionController;

Route::get('/supervision', [SupervisionController::class, 'index'])->name('supervision.index');
