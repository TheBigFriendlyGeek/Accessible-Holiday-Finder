<?php

use App\Http\Controllers\AccommodationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/accommodations', [AccommodationController::class, 'index'])
    ->name('accommodations.index');