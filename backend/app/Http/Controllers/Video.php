<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Video extends Controller
{
    public function index()
    {
        return \App\Models\Video::all();
    }
    public function UploadVideo(Request $request) {
        if ($request->hasFile('video')) {
            $file = $request->file('video');
            $name = $request->get('title');
            $description = $request->get('description');
        }
    }
    public function show()
    {
        return \App\Models\Video::all();
    }
}
