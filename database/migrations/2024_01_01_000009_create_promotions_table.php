<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['percentage', 'fixed_amount', 'buy_x_get_y', 'wholesale'])->default('percentage');
            $table->decimal('value', 10, 2)->default(0);
            $table->decimal('minimum_amount', 10, 2)->default(0);
            $table->integer('usage_limit')->nullable();
            $table->integer('used_count')->default(0);
            $table->datetime('start_date');
            $table->datetime('end_date');
            $table->json('applicable_products')->nullable();
            $table->json('applicable_categories')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('code');
            $table->index('status');
            $table->index(['start_date', 'end_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};