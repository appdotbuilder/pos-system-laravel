<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class POSSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'System Administrator',
            'email' => 'admin@pos.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'status' => 'active',
            'phone' => '+1234567890',
            'hourly_rate' => 25.00,
        ]);

        // Create manager user
        $manager = User::create([
            'name' => 'Store Manager',
            'email' => 'manager@pos.com',
            'password' => Hash::make('password'),
            'role' => 'manager',
            'status' => 'active',
            'phone' => '+1234567891',
            'hourly_rate' => 20.00,
        ]);

        // Create cashier user
        $cashier = User::create([
            'name' => 'John Cashier',
            'email' => 'cashier@pos.com',
            'password' => Hash::make('password'),
            'role' => 'cashier',
            'status' => 'active',
            'phone' => '+1234567892',
            'hourly_rate' => 15.00,
        ]);

        // Create store
        $store = Store::create([
            'name' => 'RetailPOS Store',
            'code' => 'MAIN001',
            'address' => '123 Main Street, City, State 12345',
            'phone' => '+1-555-0123',
            'email' => 'store@retailpos.com',
            'tax_rate' => 8.25,
            'status' => 'active',
        ]);

        // Create categories
        $electronics = Category::create([
            'name' => 'Electronics',
            'slug' => 'electronics',
            'description' => 'Electronic devices and accessories',
            'status' => 'active',
        ]);

        $clothing = Category::create([
            'name' => 'Clothing',
            'slug' => 'clothing',
            'description' => 'Apparel and fashion items',
            'status' => 'active',
        ]);

        $home = Category::create([
            'name' => 'Home & Garden',
            'slug' => 'home-garden',
            'description' => 'Home improvement and garden supplies',
            'status' => 'active',
        ]);

        $books = Category::create([
            'name' => 'Books',
            'slug' => 'books',
            'description' => 'Books and educational materials',
            'status' => 'active',
        ]);

        // Create products
        $products = [
            // Electronics
            [
                'name' => 'Wireless Bluetooth Headphones',
                'sku' => 'ELE001',
                'barcode' => '1234567890123',
                'description' => 'High-quality wireless headphones with noise cancellation',
                'category_id' => $electronics->id,
                'purchase_price' => 45.00,
                'selling_price' => 89.99,
                'wholesale_price' => 75.00,
                'stock_quantity' => 25,
                'low_stock_threshold' => 5,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            [
                'name' => 'Smartphone Case',
                'sku' => 'ELE002',
                'barcode' => '1234567890124',
                'description' => 'Protective case for smartphones',
                'category_id' => $electronics->id,
                'purchase_price' => 8.00,
                'selling_price' => 19.99,
                'wholesale_price' => 15.00,
                'stock_quantity' => 50,
                'low_stock_threshold' => 10,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            [
                'name' => 'USB-C Charging Cable',
                'sku' => 'ELE003',
                'barcode' => '1234567890125',
                'description' => '6ft USB-C to USB-A charging cable',
                'category_id' => $electronics->id,
                'purchase_price' => 5.00,
                'selling_price' => 12.99,
                'wholesale_price' => 10.00,
                'stock_quantity' => 100,
                'low_stock_threshold' => 20,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            // Clothing
            [
                'name' => 'Cotton T-Shirt',
                'sku' => 'CLO001',
                'barcode' => '1234567890126',
                'description' => '100% cotton crew neck t-shirt',
                'category_id' => $clothing->id,
                'purchase_price' => 12.00,
                'selling_price' => 24.99,
                'wholesale_price' => 20.00,
                'stock_quantity' => 75,
                'low_stock_threshold' => 15,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            [
                'name' => 'Denim Jeans',
                'sku' => 'CLO002',
                'barcode' => '1234567890127',
                'description' => 'Classic fit denim jeans',
                'category_id' => $clothing->id,
                'purchase_price' => 25.00,
                'selling_price' => 59.99,
                'wholesale_price' => 45.00,
                'stock_quantity' => 30,
                'low_stock_threshold' => 8,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            // Home & Garden
            [
                'name' => 'Coffee Mug Set',
                'sku' => 'HOME001',
                'barcode' => '1234567890128',
                'description' => 'Set of 4 ceramic coffee mugs',
                'category_id' => $home->id,
                'purchase_price' => 15.00,
                'selling_price' => 34.99,
                'wholesale_price' => 28.00,
                'stock_quantity' => 20,
                'low_stock_threshold' => 5,
                'unit' => 'set',
                'status' => 'active',
            ],
            [
                'name' => 'Indoor Plant Pot',
                'sku' => 'HOME002',
                'barcode' => '1234567890129',
                'description' => 'Decorative ceramic plant pot with drainage',
                'category_id' => $home->id,
                'purchase_price' => 8.00,
                'selling_price' => 18.99,
                'wholesale_price' => 14.00,
                'stock_quantity' => 15,
                'low_stock_threshold' => 3,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            // Books
            [
                'name' => 'Business Strategy Guide',
                'sku' => 'BOOK001',
                'barcode' => '1234567890130',
                'description' => 'Comprehensive guide to business strategy',
                'category_id' => $books->id,
                'purchase_price' => 18.00,
                'selling_price' => 39.99,
                'wholesale_price' => 32.00,
                'stock_quantity' => 12,
                'low_stock_threshold' => 3,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            [
                'name' => 'Programming Fundamentals',
                'sku' => 'BOOK002',
                'barcode' => '1234567890131',
                'description' => 'Learn programming from basics to advanced',
                'category_id' => $books->id,
                'purchase_price' => 22.00,
                'selling_price' => 49.99,
                'wholesale_price' => 40.00,
                'stock_quantity' => 8,
                'low_stock_threshold' => 2,
                'unit' => 'pcs',
                'status' => 'active',
            ],
            // Low stock item for demonstration
            [
                'name' => 'Wireless Mouse',
                'sku' => 'ELE004',
                'barcode' => '1234567890132',
                'description' => 'Ergonomic wireless computer mouse',
                'category_id' => $electronics->id,
                'purchase_price' => 15.00,
                'selling_price' => 29.99,
                'wholesale_price' => 24.00,
                'stock_quantity' => 2, // Low stock for alert demonstration
                'low_stock_threshold' => 5,
                'unit' => 'pcs',
                'status' => 'active',
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        // Create sample customers
        $customers = [
            [
                'name' => 'John Smith',
                'email' => 'john.smith@email.com',
                'phone' => '+1-555-1001',
                'date_of_birth' => '1985-03-15',
                'gender' => 'male',
                'address' => '456 Oak Avenue, City, State 12345',
                'city' => 'City',
                'postal_code' => '12345',
                'loyalty_points' => 150,
                'total_spent' => 250.50,
                'total_orders' => 5,
                'membership_tier' => 'silver',
                'status' => 'active',
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.j@email.com',
                'phone' => '+1-555-1002',
                'date_of_birth' => '1990-07-22',
                'gender' => 'female',
                'address' => '789 Pine Street, City, State 12345',
                'city' => 'City',
                'postal_code' => '12345',
                'loyalty_points' => 75,
                'total_spent' => 125.75,
                'total_orders' => 3,
                'membership_tier' => 'bronze',
                'status' => 'active',
            ],
            [
                'name' => 'Mike Davis',
                'email' => 'mike.davis@email.com',
                'phone' => '+1-555-1003',
                'date_of_birth' => '1982-11-08',
                'gender' => 'male',
                'address' => '321 Elm Drive, City, State 12345',
                'city' => 'City',
                'postal_code' => '12345',
                'loyalty_points' => 500,
                'total_spent' => 1250.00,
                'total_orders' => 15,
                'membership_tier' => 'gold',
                'status' => 'active',
            ],
            [
                'name' => 'Emily Brown',
                'email' => 'emily.brown@email.com',
                'phone' => '+1-555-1004',
                'date_of_birth' => '1995-04-30',
                'gender' => 'female',
                'address' => '654 Maple Lane, City, State 12345',
                'city' => 'City',
                'postal_code' => '12345',
                'loyalty_points' => 25,
                'total_spent' => 45.99,
                'total_orders' => 1,
                'membership_tier' => 'bronze',
                'status' => 'active',
            ],
            [
                'name' => 'Robert Wilson',
                'email' => 'robert.w@email.com',
                'phone' => '+1-555-1005',
                'date_of_birth' => '1978-12-03',
                'gender' => 'male',
                'address' => '987 Cedar Court, City, State 12345',
                'city' => 'City',
                'postal_code' => '12345',
                'loyalty_points' => 1200,
                'total_spent' => 5500.00,
                'total_orders' => 45,
                'membership_tier' => 'platinum',
                'status' => 'active',
            ],
        ];

        foreach ($customers as $customerData) {
            Customer::create($customerData);
        }
    }
}