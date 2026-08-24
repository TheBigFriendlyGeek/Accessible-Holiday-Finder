import { router } from '@inertiajs/react';

type Accommodation = {
    id: number;
    name: string;
    location: string;
    description: string;
    image: string | null;
    wheelchair_accessible: boolean;
    step_free_access: boolean;
    wet_room: boolean;
    hoist_available: boolean;
};

type Filters = {
    wheelchair_accessible: boolean;
    step_free_access: boolean;
    wet_room: boolean;
    hoist_available: boolean;
};

type Props = {
    accommodations: Accommodation[];
    filters: Filters;
};

type FilterKey = keyof Filters;

export default function Index({ accommodations, filters }: Props) {
    const updateFilter = (filter: FilterKey, checked: boolean) => {
        router.get(
            '/accommodations',
            {
                ...filters,
                [filter]: checked,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        router.get(
            '/accommodations',
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
                        Accessible Holiday Finder
                    </p>

                    <h1 className="text-4xl font-bold text-slate-900">
                        Find your next accessible stay
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-slate-600">
                        Browse accommodation with accessibility features that
                        match your requirements.
                    </p>
                </header>

                <section
                    aria-labelledby="accessibility-filters-heading"
                    className="mb-10 rounded-2xl bg-white p-6 shadow-sm"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <fieldset>
                            <legend
                                id="accessibility-filters-heading"
                                className="text-lg font-semibold text-slate-900"
                            >
                                Accessibility requirements
                            </legend>

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.wheelchair_accessible}
                                        onChange={(event) =>
                                            updateFilter(
                                                'wheelchair_accessible',
                                                event.target.checked,
                                            )
                                        }
                                        className="size-4"
                                    />
                                    <span>Wheelchair accessible</span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.step_free_access}
                                        onChange={(event) =>
                                            updateFilter(
                                                'step_free_access',
                                                event.target.checked,
                                            )
                                        }
                                        className="size-4"
                                    />
                                    <span>Step-free access</span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.wet_room}
                                        onChange={(event) =>
                                            updateFilter(
                                                'wet_room',
                                                event.target.checked,
                                            )
                                        }
                                        className="size-4"
                                    />
                                    <span>Wet room</span>
                                </label>

                                <label className="flex cursor-pointer items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.hoist_available}
                                        onChange={(event) =>
                                            updateFilter(
                                                'hoist_available',
                                                event.target.checked,
                                            )
                                        }
                                        className="size-4"
                                    />
                                    <span>Hoist available</span>
                                </label>
                            </div>
                        </fieldset>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="self-start text-sm font-semibold text-teal-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 lg:self-auto"
                        >
                            Clear filters
                        </button>
                    </div>

                    <p
                        className="mt-5 text-sm text-slate-600"
                        aria-live="polite"
                    >
                        {accommodations.length}{' '}
                        {accommodations.length === 1 ? 'property' : 'properties'} found
                    </p>
                </section>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {accommodations.map((accommodation) => (
                        <article
                            key={accommodation.id}
                            className="rounded-2xl bg-white p-6 shadow-sm"
                        >
                            <p className="text-sm font-medium text-teal-700">
                                {accommodation.location}
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-slate-900">
                                {accommodation.name}
                            </h2>

                            <p className="mt-3 text-slate-600">
                                {accommodation.description}
                            </p>

                            <ul className="mt-5 space-y-2 text-sm text-slate-700">
                                {accommodation.wheelchair_accessible && (
                                    <li>✓ Wheelchair accessible</li>
                                )}

                                {accommodation.step_free_access && (
                                    <li>✓ Step-free access</li>
                                )}

                                {accommodation.wet_room && (
                                    <li>✓ Wet room</li>
                                )}

                                {accommodation.hoist_available && (
                                    <li>✓ Hoist available</li>
                                )}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}