<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\EnquiryController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/accommodations', [AccommodationController::class, 'index'])
    ->name('accommodations.index');

Route::post('/enquiries', [EnquiryController::class, 'store'])
    ->name('enquiries.store');
