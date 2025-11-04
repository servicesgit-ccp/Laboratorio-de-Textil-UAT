<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Provider extends Model
{
    use HasFactory, SoftDeletes;

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
