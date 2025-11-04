<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'number',
        'user_id',
        'style_id',
        'status',
    ];

    public function tests()
    {
        return $this->hasMany(Test::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*
     *  Estilo asociado a la solicitud (si tienes un modelo Style).
    public function style()
    {
        return $this->belongsTo(Style::class);
    }
    */
}
