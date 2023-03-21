<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->time('duration');
            $table->integer('height');
            $table->integer('width');
            $table->foreignId('second_level_category_id')->references('id')->on('second_level_categories');
            $table->string('Type');
            $table->integer('share_count');
            $table->integer('view_count');
            $table->integer('comment_count');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->boolean('isActive');
            $table->timestamp('updated_at');
            $table->timestamp('createdAt');
            $table->integer('likesCount');
            $table->string('share_url');
            $table->string('embed_html');
            $table->string('embed_link');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
