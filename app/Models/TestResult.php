<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Casts\ContentWithUserCast;

class TestResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'test_id',
        'content',
    ];

    protected $casts = [
        'content' => ContentWithUserCast::class,
    ];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }
}
