<?php

namespace Database\Factories;

use App\Models\Accommodation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Accommodation>
 */
class AccommodationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company().' Retreat',
            'location' => fake()->city().', UK',
            'description' => fake()->paragraph(3),
            'image' => null,
            'wheelchair_accessible' => fake()->boolean(75),
            'step_free_access' => fake()->boolean(75),
            'wet_room' => fake()->boolean(),
            'hoist_available' => fake()->boolean(30),
        ];
    }
}
