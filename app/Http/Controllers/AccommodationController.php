<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AccommodationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Accommodation::query();

        if ($request->boolean('wheelchair_accessible')) {
            $query->where('wheelchair_accessible', true);
        }

        if ($request->boolean('step_free_access')) {
            $query->where('step_free_access', true);
        }

        if ($request->boolean('wet_room')) {
            $query->where('wet_room', true);
        }

        if ($request->boolean('hoist_available')) {
            $query->where('hoist_available', true);
        }

        $accommodations = $query
            ->orderBy('name')
            ->get();

        return Inertia::render('accommodations/index', [
            'accommodations' => $accommodations,
            'filters' => [
                'wheelchair_accessible' => $request->boolean('wheelchair_accessible'),
                'step_free_access' => $request->boolean('step_free_access'),
                'wet_room' => $request->boolean('wet_room'),
                'hoist_available' => $request->boolean('hoist_available'),
            ],
        ]);
    }

    public function apiIndex(): JsonResponse
    {
        $accommodations = Accommodation::query()
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => $accommodations,
        ]);
    }
}
