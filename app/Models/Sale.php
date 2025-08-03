<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Sale
 *
 * @property int $id
 * @property string $sale_number
 * @property int $store_id
 * @property int|null $customer_id
 * @property int $cashier_id
 * @property float $subtotal
 * @property float $tax_amount
 * @property float $discount_amount
 * @property float $total_amount
 * @property float $amount_paid
 * @property float $change_amount
 * @property string $payment_status
 * @property string $sale_status
 * @property array|null $payment_methods
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $sale_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereSaleNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereStoreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCashierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereSaleStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale today()
 * @method static \Database\Factories\SaleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Sale extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'sale_number',
        'store_id',
        'customer_id',
        'cashier_id',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'amount_paid',
        'change_amount',
        'payment_status',
        'sale_status',
        'payment_methods',
        'notes',
        'sale_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'change_amount' => 'decimal:2',
        'payment_methods' => 'array',
        'sale_date' => 'datetime',
    ];

    /**
     * Scope a query to only include today's sales.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('sale_date', today());
    }

    /**
     * Get the store for this sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Get the customer for this sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the cashier for this sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cashier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    /**
     * Get the sale items for this sale.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    /**
     * Generate unique sale number.
     *
     * @return string
     */
    public static function generateSaleNumber(): string
    {
        $prefix = 'S' . date('Ymd');
        $lastSale = static::where('sale_number', 'like', $prefix . '%')
            ->orderBy('sale_number', 'desc')
            ->first();

        if ($lastSale) {
            $lastNumber = (int) substr($lastSale->sale_number, -4);
            $newNumber = $lastNumber + 1;
        } else {
            $newNumber = 1;
        }

        return $prefix . str_pad((string) $newNumber, 4, '0', STR_PAD_LEFT);
    }
}