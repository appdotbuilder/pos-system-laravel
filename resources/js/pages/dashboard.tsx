import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    stock_quantity: number;
    low_stock_threshold: number;
    category?: {
        name: string;
    };
}

interface Sale {
    id: number;
    sale_number: string;
    total_amount: number;
    sale_date: string;
    customer?: {
        name: string;
    };
    cashier: {
        name: string;
    };
}

interface TopProduct {
    product_name: string;
    total_sold: number;
    total_revenue: number;
}

interface SalesChartData {
    date: string;
    total: number;
    transactions: number;
}

interface Props {
    stats: {
        today_sales: number;
        today_transactions: number;
        today_profit: number;
        weekly_sales: number;
        monthly_sales: number;
        low_stock_count: number;
        total_customers: number;
        total_products: number;
    };
    lowStockProducts: Product[];
    recentSales: Sale[];
    topProducts: TopProduct[];
    salesChart: SalesChartData[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, lowStockProducts, recentSales, topProducts }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📊 Dashboard</h1>
                    <Link
                        href={route('pos.index')}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        🏪 Open POS
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Today's Sales</p>
                                <p className="text-3xl font-bold">${stats?.today_sales?.toFixed(2) || '0.00'}</p>
                                <p className="text-green-100 text-sm mt-1">{stats?.today_transactions || 0} transactions</p>
                            </div>
                            <div className="text-4xl opacity-80">💰</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Today's Profit</p>
                                <p className="text-3xl font-bold">${stats?.today_profit?.toFixed(2) || '0.00'}</p>
                                <p className="text-blue-100 text-sm mt-1">Net profit</p>
                            </div>
                            <div className="text-4xl opacity-80">📈</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Weekly Sales</p>
                                <p className="text-3xl font-bold">${stats?.weekly_sales?.toFixed(2) || '0.00'}</p>
                                <p className="text-purple-100 text-sm mt-1">This week</p>
                            </div>
                            <div className="text-4xl opacity-80">📊</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm">Monthly Sales</p>
                                <p className="text-3xl font-bold">${stats?.monthly_sales?.toFixed(2) || '0.00'}</p>
                                <p className="text-orange-100 text-sm mt-1">This month</p>
                            </div>
                            <div className="text-4xl opacity-80">🗓️</div>
                        </div>
                    </div>
                </div>

                {/* Secondary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Products</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.total_products || 0}</p>
                            </div>
                            <div className="text-3xl">📦</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Customers</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.total_customers || 0}</p>
                            </div>
                            <div className="text-3xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Low Stock Items</p>
                                <p className="text-2xl font-bold text-red-600">{stats?.low_stock_count || 0}</p>
                            </div>
                            <div className="text-3xl">⚠️</div>
                        </div>
                    </div>
                </div>

                {/* Charts and Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🧾 Recent Sales</h3>
                        <div className="space-y-3">
                            {!recentSales || recentSales.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent sales</p>
                            ) : (
                                recentSales.map((sale) => (
                                    <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{sale.sale_number}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {sale.customer?.name || 'Walk-in'} • {sale.cashier.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(sale.sale_date).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">${sale.total_amount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🏆 Top Selling Products</h3>
                        <div className="space-y-3">
                            {!topProducts || topProducts.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No sales data yet</p>
                            ) : (
                                topProducts.map((product, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{product.product_name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {product.total_sold} units sold
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-green-600">${product.total_revenue.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Low Stock Alert */}
                {lowStockProducts && lowStockProducts.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-4">⚠️ Low Stock Alert</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {lowStockProducts.map((product) => (
                                <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{product.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {product.category?.name && `${product.category.name} • `}
                                        Stock: {product.stock_quantity} / {product.low_stock_threshold}
                                    </p>
                                    <div className="mt-2">
                                        <div className="w-full bg-red-200 dark:bg-red-800 rounded-full h-2">
                                            <div 
                                                className="bg-red-600 h-2 rounded-full" 
                                                style={{ 
                                                    width: `${Math.min((product.stock_quantity / product.low_stock_threshold) * 100, 100)}%` 
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            href={route('pos.index')}
                            className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <div className="text-2xl mb-2">🏪</div>
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Open POS</span>
                        </Link>
                        
                        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg opacity-50">
                            <div className="text-2xl mb-2">📦</div>
                            <span className="text-sm font-medium text-green-700 dark:text-green-300">Inventory</span>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg opacity-50">
                            <div className="text-2xl mb-2">👥</div>
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Customers</span>
                        </div>
                        
                        <div className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg opacity-50">
                            <div className="text-2xl mb-2">📊</div>
                            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}