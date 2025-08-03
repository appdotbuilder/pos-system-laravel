<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // POS Routes
    Route::controller(POSController::class)->prefix('pos')->name('pos.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{sale}/receipt', 'show')->name('receipt');
    });
    
    // Product Routes
    Route::controller(ProductController::class)->prefix('products')->name('products.')->group(function () {
        Route::get('/', 'index')->name('index');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
