<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Store
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $address
 * @property string|null $phone
 * @property string|null $email
 * @property float $tax_rate
 * @property array|null $settings
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Store newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Store newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Store query()
 * @method static \Illuminate\Database\Eloquent\Builder|Store whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Store whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Store whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Store whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Store active()
 * @method static \Database\Factories\StoreFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Store extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'code',
        'address',
        'phone',
        'email',
        'tax_rate',
        'settings',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tax_rate' => 'decimal:2',
        'settings' => 'array',
    ];

    /**
     * Scope a query to only include active stores.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the sales for this store.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }
}