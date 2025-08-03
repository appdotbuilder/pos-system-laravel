<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Daily stats
        $todaySales = Sale::today()->sum('total_amount');
        $todayTransactions = Sale::today()->count();
        $todayProfit = $this->calculateTodayProfit();

        // Weekly stats
        $weeklySales = Sale::whereBetween('sale_date', [now()->startOfWeek(), now()->endOfWeek()])
            ->sum('total_amount');

        // Monthly stats
        $monthlySales = Sale::whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->sum('total_amount');

        // Low stock products
        $lowStockProducts = Product::lowStock()
            ->active()
            ->with('category')
            ->limit(10)
            ->get();

        // Recent sales
        $recentSales = Sale::with(['customer', 'cashier'])
            ->latest('sale_date')
            ->limit(10)
            ->get();

        // Top selling products
        $topProducts = DB::table('sale_items')
            ->select('product_name', DB::raw('SUM(quantity) as total_sold'), DB::raw('SUM(total_price) as total_revenue'))
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->whereBetween('sales.sale_date', [now()->subDays(30), now()])
            ->groupBy('product_name')
            ->orderBy('total_sold', 'desc')
            ->limit(10)
            ->get();

        // Sales chart data (last 7 days)
        $salesChart = Sale::select(
                DB::raw('DATE(sale_date) as date'),
                DB::raw('SUM(total_amount) as total'),
                DB::raw('COUNT(*) as transactions')
            )
            ->whereBetween('sale_date', [now()->subDays(6), now()])
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'today_sales' => $todaySales,
                'today_transactions' => $todayTransactions,
                'today_profit' => $todayProfit,
                'weekly_sales' => $weeklySales,
                'monthly_sales' => $monthlySales,
                'low_stock_count' => $lowStockProducts->count(),
                'total_customers' => Customer::active()->count(),
                'total_products' => Product::active()->count(),
            ],
            'lowStockProducts' => $lowStockProducts,
            'recentSales' => $recentSales,
            'topProducts' => $topProducts,
            'salesChart' => $salesChart,
        ]);
    }

    /**
     * Calculate today's profit.
     */
    protected function calculateTodayProfit(): float
    {
        $todaySaleItems = DB::table('sale_items')
            ->join('sales', 'sale_items.sale_id', '=', 'sales.id')
            ->join('products', 'sale_items.product_id', '=', 'products.id')
            ->whereDate('sales.sale_date', today())
            ->select(
                'sale_items.quantity',
                'sale_items.unit_price',
                'products.purchase_price'
            )
            ->get();

        $profit = 0;
        foreach ($todaySaleItems as $item) {
            $profit += ($item->unit_price - $item->purchase_price) * $item->quantity;
        }

        return $profit;
    }
}