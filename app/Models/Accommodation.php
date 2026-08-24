<?php

namespace App\Models;

use Database\Factories\AccommodationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Accommodation extends Model
{
    /** @use HasFactory<AccommodationFactory> */
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

    /**
     * @return HasMany<Enquiry, $this>
     */
    public function enquiries(): HasMany
    {
        return $this->hasMany(Enquiry::class);
    }
}
