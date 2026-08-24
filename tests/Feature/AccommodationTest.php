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

        $response->assertInertia(fn ($page) =>
            $page
                ->component('accommodations/index')
                ->has('accommodations', 3)
        );
    }
}