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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique();
            $table->string('barcode')->nullable()->unique();
            $table->text('description')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('purchase_price', 10, 2)->default(0);
            $table->decimal('selling_price', 10, 2);
            $table->decimal('wholesale_price', 10, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->integer('low_stock_threshold')->default(10);
            $table->string('unit')->default('pcs');
            $table->json('images')->nullable();
            $table->boolean('has_variants')->default(false);
            $table->boolean('track_stock')->default(true);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('sku');
            $table->index('barcode');
            $table->index('status');
            $table->index('category_id');
            $table->index('stock_quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};