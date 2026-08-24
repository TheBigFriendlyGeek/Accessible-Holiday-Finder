<?php

namespace Tests\Feature;

use App\Models\Accommodation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccommodationTest extends TestCase
{
    use RefreshDatabase;

    public function test_accommodations_can_be_listed(): void
    {
        $this->withoutVite();

        Accommodation::factory()->count(3)->create();

        $response = $this->get('/accommodations');

        $response->assertStatus(200);

        $response->assertInertia(
            fn($page) =>
            $page
                ->component('accommodations/index')
                ->has('accommodations', 3)
        );
    }

    public function test_accommodations_can_be_searched(): void
    {
        $this->withoutVite();

        Accommodation::factory()->create([
            'name' => 'Coastal Escape',
            'location' => 'Tenby, Pembrokeshire',
            'description' => 'A bright coastal apartment near the beach.',
            'wheelchair_accessible' => false,
        ]);

        Accommodation::factory()->create([
            'name' => 'Meadow Retreat',
            'location' => 'Bakewell, Derbyshire',
            'description' => 'A peaceful countryside retreat.',
            'wheelchair_accessible' => true,
        ]);

        $response = $this->get('/accommodations?search=Coastal');

        $response->assertStatus(200);

        $response->assertInertia(
            fn($page) =>
            $page
                ->component('accommodations/index')
                ->has('accommodations', 1)
                ->where('accommodations.0.name', 'Coastal Escape')
        );
    }
}
