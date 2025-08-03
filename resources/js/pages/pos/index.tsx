import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { router, Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Product {
    id: number;
    name: string;
    sku: string;
    selling_price: number;
    stock_quantity: number;
    category?: {
        name: string;
    };
}

interface Customer {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    loyalty_points: number;
}

interface Store {
    id: number;
    name: string;
    tax_rate: number;
}

interface CartItem {
    product_id: number;
    name: string;
    sku: string;
    unit_price: number;
    quantity: number;
    discount_amount: number;
}

interface Props {
    products: Product[];
    customers: Customer[];
    stores: Store[];
    stats: {
        today_sales: number;
        today_transactions: number;
        low_stock_count: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Point of Sale',
        href: '/pos',
    },
];

export default function POSIndex({ products, customers, stores, stats }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [selectedStore] = useState<Store>(stores[0] || null);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([{ method: 'cash', amount: 0 }]);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.product_id === product.id);
        
        if (existingItem) {
            setCart(cart.map(item =>
                item.product_id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, {
                product_id: product.id,
                name: product.name,
                sku: product.sku,
                unit_price: product.selling_price,
                quantity: 1,
                discount_amount: 0,
            }]);
        }
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            setCart(cart.filter(item => item.product_id !== productId));
        } else {
            setCart(cart.map(item =>
                item.product_id === productId
                    ? { ...item, quantity }
                    : item
            ));
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product_id !== productId));
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * (selectedStore?.tax_rate || 0) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        const totalAmount = calculateTotal();
        const totalPaid = paymentMethods.reduce((sum, pm) => sum + pm.amount, 0);

        if (totalPaid < totalAmount) {
            alert('Insufficient payment amount!');
            return;
        }

        const saleData = {
            store_id: selectedStore.id,
            customer_id: selectedCustomer?.id || null,
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
                discount_amount: item.discount_amount,
            })),
            payment_methods: paymentMethods,
            subtotal: calculateSubtotal(),
            tax_amount: calculateTax(),
            discount_amount: 0,
            total_amount: totalAmount,
            amount_paid: totalPaid,
        };

        router.post(route('pos.store'), saleData);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {/* Left Panel - Products */}
                <div className="flex-1 p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex flex-col">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                🏪 Point of Sale
                            </h2>
                            
                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                                    <div className="text-sm text-green-600 dark:text-green-400">Today's Sales</div>
                                    <div className="text-lg font-bold text-green-700 dark:text-green-300">
                                        ${stats.today_sales.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                                    <div className="text-sm text-blue-600 dark:text-blue-400">Transactions</div>
                                    <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                                        {stats.today_transactions}
                                    </div>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                                    <div className="text-sm text-orange-600 dark:text-orange-400">Low Stock</div>
                                    <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
                                        {stats.low_stock_count}
                                    </div>
                                </div>
                            </div>

                            {/* Search */}
                            <input
                                type="text"
                                placeholder="🔍 Search products by name or SKU..."
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                        onClick={() => addToCart(product)}
                                    >
                                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            SKU: {product.sku}
                                        </p>
                                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            ${product.selling_price.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Stock: {product.stock_quantity}
                                        </p>
                                        {product.category && (
                                            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mt-2">
                                                {product.category.name}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Cart */}
                <div className="w-96 p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full flex flex-col">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                🛒 Shopping Cart
                            </h3>
                            
                            {/* Customer Selection */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Customer (Optional)
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white text-sm"
                                    value={selectedCustomer?.id || ''}
                                    onChange={(e) => {
                                        const customerId = parseInt(e.target.value);
                                        setSelectedCustomer(customers.find(c => c.id === customerId) || null);
                                    }}
                                >
                                    <option value="">Walk-in Customer</option>
                                    {customers.map((customer) => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name} ({customer.loyalty_points} pts)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {cart.length === 0 ? (
                                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                                    <p>Cart is empty</p>
                                    <p className="text-sm mt-2">Click on products to add them</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div key={item.product_id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromCart(item.product_id)}
                                                    className="text-red-500 hover:text-red-700 text-sm"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                        className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded text-sm"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-medium dark:text-white">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                        className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded text-sm"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        ${item.unit_price.toFixed(2)} each
                                                    </div>
                                                    <div className="font-bold text-gray-900 dark:text-white">
                                                        ${(item.unit_price * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Totals and Checkout */}
                        {cart.length > 0 && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                        <span className="text-gray-900 dark:text-white">${calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Tax ({selectedStore?.tax_rate || 0}%):</span>
                                        <span className="text-gray-900 dark:text-white">${calculateTax().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                                        <span className="text-gray-900 dark:text-white">Total:</span>
                                        <span className="text-gray-900 dark:text-white">${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Payment Amount
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                                        value={paymentMethods[0]?.amount || ''}
                                        onChange={(e) => {
                                            const amount = parseFloat(e.target.value) || 0;
                                            setPaymentMethods([{ method: 'cash', amount }]);
                                        }}
                                        placeholder="Enter payment amount"
                                    />
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                                >
                                    💳 Process Sale
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}