<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Override;

#[Fillable(
    'user_id',
    'total',
    'cash_tendered',
    'cash_amount',
    'status',
    'note'
)]
class Sale extends Model
{
    #[Override]
    protected $casts = [
        'total' => 'decimal:2',
        'cash_tendered' => 'decimal:2',
        'cash_amount' => 'decimal:2',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }
}