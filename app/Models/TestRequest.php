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
        'item',
        'status',
        'notes',
        'new_image',
        'is_development',
        'is_informative',
        'assignated_to',
        'cancelation_notes',
        'reviewed_by',
        'comment_committee',
        'is_re_entry',
    ];

    public const STATUS = [
        'CREATED' => 0,
        'IN_PROGRESS' => 1,
        'PENDING_REVIEW' => 2,
        'COMPLETED_REVIEW' => 3,
        'APPROVED'    => 4,
        'REJECTED' => 5,
        'ALL'  => 6,
        'APPROVED_COMMITTEE' => 7,
        'REJECTED_COMMITTEE' => 8,
        'RE-ENTRY' => 9,
    ];

    protected $appends = ['image'];

    public function test()
    {
        return $this->hasMany(Test::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function style()
    {
        return $this->belongsTo(Style::class);
    }

    public function getImageAttribute()
    {
        return $this->style->image;
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
