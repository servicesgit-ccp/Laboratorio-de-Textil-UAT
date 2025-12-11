<?php

use App\Http\Controllers\CommitteeController;

Route::get('/committee', [CommitteeController::class, 'index'])->name('committee.index');
