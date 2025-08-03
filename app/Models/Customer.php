<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string $name
 * @property string|null $email
 * @property string|null $phone
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string|null $gender
 * @property string|null $address
 * @property string|null $city
 * @property string|null $postal_code
 * @property int $loyalty_points
 * @property float $total_spent
 * @property int $total_orders
 * @property string $membership_tier
 * @property array|null $preferences
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer active()
 * @method static \Database\Factories\CustomerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Customer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'postal_code',
        'loyalty_points',
        'total_spent',
        'total_orders',
        'membership_tier',
        'preferences',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'loyalty_points' => 'integer',
        'total_spent' => 'decimal:2',
        'total_orders' => 'integer',
        'preferences' => 'array',
    ];

    /**
     * Scope a query to only include active customers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the sales for this customer.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    /**
     * Add loyalty points to customer.
     *
     * @param int $points
     * @return void
     */
    public function addLoyaltyPoints(int $points): void
    {
        $this->increment('loyalty_points', $points);
        $this->updateMembershipTier();
    }

    /**
     * Update membership tier based on total spent.
     *
     * @return void
     */
    protected function updateMembershipTier(): void
    {
        if ($this->total_spent >= 10000) {
            $this->membership_tier = 'platinum';
        } elseif ($this->total_spent >= 5000) {
            $this->membership_tier = 'gold';
        } elseif ($this->total_spent >= 1000) {
            $this->membership_tier = 'silver';
        } else {
            $this->membership_tier = 'bronze';
        }
        $this->save();
    }
}