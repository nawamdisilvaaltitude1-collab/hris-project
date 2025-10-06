<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); // <--- Add this

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});