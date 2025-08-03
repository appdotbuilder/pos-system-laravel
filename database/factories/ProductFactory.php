<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purchasePrice = fake()->randomFloat(2, 5, 100);
        $sellingPrice = $purchasePrice * fake()->randomFloat(2, 1.5, 3.0);
        $wholesalePrice = $purchasePrice * fake()->randomFloat(2, 1.2, 1.8);
        
        return [
            'name' => fake()->words(3, true),
            'sku' => fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'barcode' => fake()->unique()->ean13(),
            'description' => fake()->sentence(),
            'category_id' => Category::factory(),
            'purchase_price' => $purchasePrice,
            'selling_price' => $sellingPrice,
            'wholesale_price' => $wholesalePrice,
            'stock_quantity' => fake()->numberBetween(0, 100),
            'low_stock_threshold' => fake()->numberBetween(5, 20),
            'unit' => fake()->randomElement(['pcs', 'kg', 'lbs', 'set', 'pack']),
            'has_variants' => fake()->boolean(20),
            'track_stock' => fake()->boolean(90),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}