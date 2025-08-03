<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SaleItem>
 */
class SaleItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $unitPrice = fake()->randomFloat(2, 5, 100);
        $quantity = fake()->numberBetween(1, 5);
        $discountAmount = fake()->randomFloat(2, 0, $unitPrice * $quantity * 0.1);
        $totalPrice = ($unitPrice * $quantity) - $discountAmount;
        
        return [
            'sale_id' => Sale::factory(),
            'product_id' => Product::factory(),
            'product_name' => fake()->words(3, true),
            'product_sku' => fake()->regexify('[A-Z]{3}[0-9]{3}'),
            'unit_price' => $unitPrice,
            'quantity' => $quantity,
            'discount_amount' => $discountAmount,
            'total_price' => $totalPrice,
        ];
    }
}