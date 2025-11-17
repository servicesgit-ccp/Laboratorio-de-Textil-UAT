<?php

use App\Http\Controllers\CatalogueController;

Route::get('/items/{number}', [CatalogueController::class, 'showItem'])->name('items.show');
