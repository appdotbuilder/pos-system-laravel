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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'manager', 'cashier'])->default('cashier')->after('email');
            $table->enum('status', ['active', 'inactive'])->default('active')->after('role');
            $table->string('phone')->nullable()->after('email');
            $table->decimal('hourly_rate', 8, 2)->nullable()->after('status');
            $table->json('permissions')->nullable()->after('hourly_rate');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'status', 'phone', 'hourly_rate', 'permissions']);
        });
    }
};