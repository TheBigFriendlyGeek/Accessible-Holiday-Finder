<?php

use App\Http\Controllers\AccommodationController;
use Illuminate\Support\Facades\Route;

Route::get('/accommodations', [AccommodationController::class, 'apiIndex']);