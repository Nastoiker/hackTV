<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSecondLevelCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('second_level_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('alias');
            $table->foreignId( 'first_level_category_id')->references('id')->on('first_level_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('second_level_categories');
    }
}
