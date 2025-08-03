<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalSpent = fake()->randomFloat(2, 0, 5000);
        $totalOrders = fake()->numberBetween(0, 50);
        $loyaltyPoints = (int) ($totalSpent * 0.1); // 1 point per 10 dollars
        
        // Determine membership tier based on total spent
        $membershipTier = 'bronze';
        if ($totalSpent >= 10000) {
            $membershipTier = 'platinum';
        } elseif ($totalSpent >= 5000) {
            $membershipTier = 'gold';
        } elseif ($totalSpent >= 1000) {
            $membershipTier = 'silver';
        }
        
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-18 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'address' => fake()->address(),
            'city' => fake()->city(),
            'postal_code' => fake()->postcode(),
            'loyalty_points' => $loyaltyPoints,
            'total_spent' => $totalSpent,
            'total_orders' => $totalOrders,
            'membership_tier' => $membershipTier,
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}