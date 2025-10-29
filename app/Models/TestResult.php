<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TestResult extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'test_id',
        'content',
    ];

    protected $casts = [
        'content' => 'array',
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
