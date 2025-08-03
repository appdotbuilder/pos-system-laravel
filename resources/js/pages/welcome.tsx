import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="POS System - Retail Made Simple">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Navigation */}
                <header className="w-full px-6 py-4">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">🏪</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">RetailPOS</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            🚀 Modern Point of Sale
                            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Built for Success
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                            Complete retail management solution with inventory tracking, customer management, 
                            real-time analytics, and multi-location support. Everything you need to run your business efficiently.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
                                    >
                                        🎯 Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-semibold text-lg"
                                    >
                                        Sign In to Dashboard
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💳</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quick Sales Processing</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Lightning-fast checkout with barcode scanning, multiple payment methods (cash, card, QR, e-wallet), 
                                and instant receipt generation.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Smart Inventory</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Automatic stock tracking, low stock alerts, product variants support, 
                                and multi-location warehouse management.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customer Management</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Complete customer database with purchase history, loyalty programs, 
                                membership tiers, and personalized promotions.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-time Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Comprehensive reports on sales, profits, inventory, and performance. 
                                Export to Excel/PDF for detailed analysis.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🔐</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Role-Based Access</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Secure login system with different roles (Admin, Manager, Cashier) 
                                and customizable permissions for each user.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">☁️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cloud-Based</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Access your business data from anywhere. Multi-store support, 
                                e-commerce integration, and automatic backups.
                            </p>
                        </div>
                    </div>

                    {/* Demo Dashboard Preview */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            📈 Live Dashboard Preview
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="text-center p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white">
                                <div className="text-2xl font-bold">$12,847</div>
                                <div className="text-sm opacity-90">Today's Sales</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                                <div className="text-2xl font-bold">156</div>
                                <div className="text-sm opacity-90">Transactions</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
                                <div className="text-2xl font-bold">1,247</div>
                                <div className="text-sm opacity-90">Products</div>
                            </div>
                            <div className="text-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
                                <div className="text-2xl font-bold">892</div>
                                <div className="text-sm opacity-90">Customers</div>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Sales Activity</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Sale #S20240101001</span>
                                    <span className="text-green-600 font-semibold">$89.50</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Sale #S20240101002</span>
                                    <span className="text-green-600 font-semibold">$145.75</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Sale #S20240101003</span>
                                    <span className="text-green-600 font-semibold">$67.25</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
                        <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business? 🚀</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of retailers who trust our POS system to manage their operations efficiently.
                        </p>
                        {!auth.user && (
                            <Link
                                href={route('register')}
                                className="inline-flex items-center px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg shadow-lg"
                            >
                                🎯 Get Started Now - Free Trial
                            </Link>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <p>Built with ❤️ using Laravel & React • Secure • Scalable • Modern</p>
                </footer>
            </div>
        </>
    );
}