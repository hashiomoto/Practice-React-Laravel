<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;  //Postをモデルをuseする


class PostController extends Controller
{
     // postの一覧を表示する
        public function index()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    public function create(Request $request)
    {
        $post = new Post;
        $post->name = $request->name;
        $post->content = $request->content;
        $post->save();
        return response()->json($post, 200);
    }

    public function edit(Request $request)
    {
        $post = Post::find($request->id);
        return $post;
    }

   //データを更新するためのアクション
    public function update(Request $request)
    {
        $post = Post::find($request->id);
        $post->name = $request->name;
        $post->content = $request->content;
        $post->save();
        $posts = Post::all();
        return $posts;
    }

    public function delete(Request $request)
    {
        $post =  Post::find($request->id);
        $post->delete();
        $posts = Post::all();
        return $posts;
    }
}
