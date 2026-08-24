<?php

namespace App\Http\Controllers;

use App\Models\Accommodation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccommodationController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Accommodation::query();

        $search = trim((string) $request->input('search', ''));

        if ($search !== '') {
            $normalizedSearch = strtolower($search);

            $query->where(function ($searchQuery) use ($search, $normalizedSearch) {
                $searchQuery
                    ->whereLike('name', "%{$search}%")
                    ->orWhereLike('location', "%{$search}%")
                    ->orWhereLike('description', "%{$search}%");

                if (str_contains($normalizedSearch, 'wheelchair')) {
                    $searchQuery->orWhere('wheelchair_accessible', true);
                }

                if (
                    str_contains($normalizedSearch, 'step-free') ||
                    str_contains($normalizedSearch, 'step free')
                ) {
                    $searchQuery->orWhere('step_free_access', true);
                }

                if (
                    str_contains($normalizedSearch, 'wet room') ||
                    str_contains($normalizedSearch, 'wetroom')
                ) {
                    $searchQuery->orWhere('wet_room', true);
                }

                if (str_contains($normalizedSearch, 'hoist')) {
                    $searchQuery->orWhere('hoist_available', true);
                }
            });
        }

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
                'search' => $search,
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
