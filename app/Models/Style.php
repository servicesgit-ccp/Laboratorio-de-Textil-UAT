<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'provider_id',
        'description',
        'order_id',
        'department_id',
    ];

    protected $appends = ['image'];

    public function provider()
    {
        return $this->belongsTo(Provider::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function getImageAttribute()
    {
        return 'http://40.114.30.62/productshot?estilo=' . $this->number;
    }
}
