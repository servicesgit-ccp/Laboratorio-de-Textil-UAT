<?php

use App\Http\Controllers\CommitteeController;

Route::get('/committee', [CommitteeController::class, 'index'])->name('committee.index');
Route::get('/committee/detail/{committee}', [CommitteeController::class, 'detail'])->name('committee.detail');
