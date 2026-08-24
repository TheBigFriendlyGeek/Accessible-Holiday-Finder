<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    public function run(): void
    {
        Accommodation::factory()->create([
            'name' => 'Seaview Accessible Cottage',
            'location' => 'Whitby, North Yorkshire',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => true,
            'hoist_available' => false,
        ]);

        Accommodation::factory()->create([
            'name' => 'Harbour View Lodge',
            'location' => 'Falmouth, Cornwall',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => true,
            'hoist_available' => true,
        ]);

        Accommodation::factory()->create([
            'name' => 'Meadow Retreat',
            'location' => 'Bakewell, Derbyshire',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);

        Accommodation::factory()->create([
            'name' => 'Lakeside Haven',
            'location' => 'Windermere, Cumbria',
            'wheelchair_accessible' => true,
            'step_free_access' => false,
            'wet_room' => true,
            'hoist_available' => true,
        ]);

        Accommodation::factory()->create([
            'name' => 'Coastal Escape',
            'location' => 'Tenby, Pembrokeshire',
            'wheelchair_accessible' => false,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);

        Accommodation::factory()->count(3)->create();
    }
}