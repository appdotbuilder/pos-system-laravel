<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Store',
            'code' => fake()->unique()->regexify('[A-Z]{3}[0-9]{3}'),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->companyEmail(),
            'tax_rate' => fake()->randomFloat(2, 5, 15),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}