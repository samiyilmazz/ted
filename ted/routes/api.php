<?php

use App\Http\Controllers\API\NotesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/notes', [NotesController::class, 'index']);
Route::get('/students', [NotesController::class, 'students']);
Route::post('/add-notes', [NotesController::class, 'store']);
Route::post('/update', [NotesController::class, 'detail']);
Route::post('/updateNotes', [NotesController::class, 'updateNotes']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
