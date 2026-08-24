<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use Illuminate\Database\Seeder;

class AccommodationSeeder extends Seeder
{
    public function run(): void
    {
        Accommodation::create([
            'name' => 'Seaview Accessible Cottage',
            'location' => 'Whitby, North Yorkshire',
            'description' => 'A peaceful coastal cottage close to Whitby seafront, with level access throughout, wide doorways and a spacious wet room. Ideal for guests looking for an accessible seaside break.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => true,
            'hoist_available' => false,
        ]);

        Accommodation::create([
            'name' => 'Harbour View Lodge',
            'location' => 'Falmouth, Cornwall',
            'description' => 'A modern accessible lodge overlooking Falmouth harbour, featuring step-free access, an adapted wet room and a ceiling hoist. Beaches, restaurants and the waterfront are nearby.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => true,
            'hoist_available' => true,
        ]);

        Accommodation::create([
            'name' => 'Meadow Retreat',
            'location' => 'Bakewell, Derbyshire',
            'description' => 'A wheelchair-accessible countryside retreat in the Peak District with level entrances, generous living spaces and peaceful views across the surrounding meadows.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);

        Accommodation::create([
            'name' => 'Lakeside Haven',
            'location' => 'Windermere, Cumbria',
            'description' => 'An adapted lakeside property with panoramic views of Windermere, an accessible wet room and a mobile hoist. A relaxing base for exploring the Lake District.',
            'wheelchair_accessible' => true,
            'step_free_access' => false,
            'wet_room' => true,
            'hoist_available' => true,
        ]);

        Accommodation::create([
            'name' => 'Coastal Escape',
            'location' => 'Tenby, Pembrokeshire',
            'description' => 'A bright coastal apartment within easy reach of Tenby harbour and sandy beaches. The accommodation has step-free access and an open-plan living area.',
            'wheelchair_accessible' => false,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);

        Accommodation::create([
            'name' => 'Forest View Cabin',
            'location' => 'New Forest, Hampshire',
            'description' => 'A spacious woodland cabin with wheelchair access, level outdoor decking and accessible paths leading into the surrounding forest. A quiet option for nature lovers.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);

        Accommodation::create([
            'name' => 'Pembroke Beach House',
            'location' => 'Saundersfoot, Pembrokeshire',
            'description' => 'A family-friendly beach house with wheelchair access, an adapted wet room and a portable hoist. The promenade and accessible beach facilities are a short distance away.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => true,
            'hoist_available' => true,
        ]);

        Accommodation::create([
            'name' => 'Yorkshire Dales Hideaway',
            'location' => 'Grassington, North Yorkshire',
            'description' => 'A cosy rural property surrounded by Yorkshire Dales countryside, offering step-free access, wheelchair-friendly living spaces and accessible parking beside the entrance.',
            'wheelchair_accessible' => true,
            'step_free_access' => true,
            'wet_room' => false,
            'hoist_available' => false,
        ]);
    }
}