<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'user_id',
        'style_id',
        'status',
    ];

    public function test()
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
