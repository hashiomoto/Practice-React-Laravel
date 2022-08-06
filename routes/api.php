<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api'], function(){
    Route::get('posts', 'App\Http\Controllers\Api\PostController@index');
    Route::post('post/create', 'App\Http\Controllers\Api\PostController@create'); //追記
    Route::post('edit', 'App\Http\Controllers\Api\PostController@edit'); //追記
    Route::post('update', 'App\Http\Controllers\Api\PostController@update'); //追記
    Route::post('delete', 'App\Http\Controllers\Api\PostController@delete');
});

