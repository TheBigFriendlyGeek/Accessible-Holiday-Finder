<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'description',
        'image',
        'wheelchair_accessible',
        'step_free_access',
        'wet_room',
        'hoist_available',
    ];

    protected function casts(): array
    {
        return [
            'wheelchair_accessible' => 'boolean',
            'step_free_access' => 'boolean',
            'wet_room' => 'boolean',
            'hoist_available' => 'boolean',
        ];
    }
}