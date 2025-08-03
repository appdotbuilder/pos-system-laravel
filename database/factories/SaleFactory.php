<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 10, 1000);
        $taxRate = 0.0825; // 8.25%
        $taxAmount = $subtotal * $taxRate;
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.2);
        $totalAmount = $subtotal + $taxAmount - $discountAmount;
        $amountPaid = $totalAmount + fake()->randomFloat(2, 0, 50);
        
        return [
            'sale_number' => 'S' . date('Ymd') . fake()->unique()->numberBetween(1000, 9999),
            'store_id' => Store::factory(),
            'customer_id' => fake()->optional()->randomElement([Customer::factory()]),
            'cashier_id' => User::factory(),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'amount_paid' => $amountPaid,
            'change_amount' => $amountPaid - $totalAmount,
            'payment_status' => fake()->randomElement(['pending', 'paid', 'partial', 'refunded']),
            'sale_status' => fake()->randomElement(['completed', 'cancelled', 'refunded']),
            'payment_methods' => [
                ['method' => 'cash', 'amount' => $amountPaid]
            ],
            'sale_date' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}