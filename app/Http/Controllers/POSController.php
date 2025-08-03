<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $products = Product::with('category')
            ->active()
            ->orderBy('name')
            ->get();

        $customers = Customer::active()
            ->orderBy('name')
            ->get();

        $stores = Store::active()
            ->orderBy('name')
            ->get();

        // Get today's sales stats
        $todaySales = Sale::today()->sum('total_amount');
        $todayTransactions = Sale::today()->count();
        
        // Get low stock products
        $lowStockProducts = Product::lowStock()
            ->active()
            ->count();

        return Inertia::render('pos/index', [
            'products' => $products,
            'customers' => $customers,
            'stores' => $stores,
            'stats' => [
                'today_sales' => $todaySales,
                'today_transactions' => $todayTransactions,
                'low_stock_count' => $lowStockProducts,
            ],
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'store_id' => 'required|exists:stores,id',
            'customer_id' => 'nullable|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'payment_methods' => 'required|array',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'amount_paid' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Create the sale
            $sale = Sale::create([
                'sale_number' => Sale::generateSaleNumber(),
                'store_id' => $request->store_id,
                'customer_id' => $request->customer_id,
                'cashier_id' => Auth::id(),
                'subtotal' => $request->subtotal,
                'tax_amount' => $request->tax_amount,
                'discount_amount' => $request->discount_amount,
                'total_amount' => $request->total_amount,
                'amount_paid' => $request->amount_paid,
                'change_amount' => $request->amount_paid - $request->total_amount,
                'payment_methods' => $request->payment_methods,
                'sale_date' => now(),
            ]);

            // Create sale items and update inventory
            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);
                
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'unit_price' => $item['unit_price'],
                    'quantity' => $item['quantity'],
                    'discount_amount' => $item['discount_amount'] ?? 0,
                    'total_price' => $item['quantity'] * $item['unit_price'] - ($item['discount_amount'] ?? 0),
                ]);

                // Update product stock
                if ($product->track_stock) {
                    $product->decrement('stock_quantity', $item['quantity']);
                }
            }

            // Update customer stats if customer is selected
            if ($request->customer_id) {
                $customer = Customer::find($request->customer_id);
                $customer->increment('total_spent', $request->total_amount);
                $customer->increment('total_orders');
                
                // Add loyalty points (1 point per dollar)
                $customer->addLoyaltyPoints((int) $request->total_amount);
            }

            DB::commit();

            return redirect()->route('pos.receipt', $sale)
                ->with('success', 'Sale completed successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->withErrors([
                'error' => 'Failed to process sale: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show receipt for a sale.
     */
    public function show(Sale $sale)
    {
        $sale->load(['items', 'customer', 'store', 'cashier']);

        return Inertia::render('pos/receipt', [
            'sale' => $sale,
        ]);
    }
}