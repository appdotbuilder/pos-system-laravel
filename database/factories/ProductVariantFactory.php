<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 10, 200);
        
        return [
            'product_id' => Product::factory(),
            'name' => fake()->words(2, true),
            'sku' => fake()->unique()->regexify('VAR[0-9]{3}'),
            'barcode' => fake()->unique()->ean13(),
            'price' => $price,
            'stock_quantity' => fake()->numberBetween(0, 50),
            'attributes' => [
                'size' => fake()->randomElement(['S', 'M', 'L', 'XL']),
                'color' => fake()->colorName(),
            ],
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}