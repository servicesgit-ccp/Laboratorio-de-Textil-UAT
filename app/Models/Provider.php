<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'number',
        'designation',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function styles()
    {
        return $this->hasMany(Style::class);
    }
}
