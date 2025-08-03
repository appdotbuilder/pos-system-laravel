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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('sale_number')->unique();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('cashier_id')->constrained('users')->cascadeOnDelete();
            $table->decimal('subtotal', 12, 2);
            $table->decimal('tax_amount', 12, 2)->default(0);
            $table->decimal('discount_amount', 12, 2)->default(0);
            $table->decimal('total_amount', 12, 2);
            $table->decimal('amount_paid', 12, 2)->default(0);
            $table->decimal('change_amount', 12, 2)->default(0);
            $table->enum('payment_status', ['pending', 'paid', 'partial', 'refunded'])->default('paid');
            $table->enum('sale_status', ['completed', 'cancelled', 'refunded'])->default('completed');
            $table->json('payment_methods')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('sale_date');
            $table->timestamps();
            
            $table->index('sale_number');
            $table->index('store_id');
            $table->index('customer_id');
            $table->index('cashier_id');
            $table->index('sale_date');
            $table->index('payment_status');
            $table->index('sale_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};