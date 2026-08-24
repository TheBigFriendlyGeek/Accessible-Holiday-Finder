import { useEffect, useState } from 'react';
import { router, useForm, usePage } from '@inertiajs/react';

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
    search: string;
    wheelchair_accessible: boolean;
    step_free_access: boolean;
    wet_room: boolean;
    hoist_available: boolean;
};

type Props = {
    accommodations: Accommodation[];
    filters: Filters;
};

type FlashProps = {
    flash: {
        success?: string;
    };
};

type AccessibilityFilterKey = Exclude<keyof Filters, 'search'>;

export default function Index({ accommodations, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search ?? '');

    useEffect(() => {
        if (searchTerm === filters.search) {
            return;
        }

        const timeout = window.setTimeout(() => {
            router.get(
                '/accommodations',
                {
                    ...filters,
                    search: searchTerm || undefined,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 300);

        return () => window.clearTimeout(timeout);
    }, [searchTerm, filters]);

    const updateFilter = (
        filter: AccessibilityFilterKey,
        checked: boolean,
    ) => {
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
        setSearchTerm('');

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

    const enquiryForm = useForm({
        accommodation_id: '',
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const submitEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        enquiryForm.post('/enquiries', {
            preserveScroll: true,
            onSuccess: () => enquiryForm.reset(),
        });
    };

    const { flash } = usePage<FlashProps>().props;

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
                        Accessible Holiday Finder
                    </p>

                    <h1 className="text-4xl font-bold text-slate-900">
                        A holiday that works for you
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-slate-600">
                        Find accessible places to stay with the facilities and features that matter to you.
                    </p>
                </header>

                <section
                    aria-labelledby="accessibility-filters-heading"
                    className="mb-10 rounded-2xl bg-white p-6 shadow-sm"
                >
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                        <div className="space-y-6">

                            <div className="w-full lg:max-w-md">

                                <label
                                    htmlFor="accommodation-search"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Search accommodation
                                </label>

                                <input
                                    id="accommodation-search"
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Try Coastal, Cornwall or Wheelchair"
                                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                />

                                <p className="mt-2 text-sm text-slate-500">
                                    Search by property, location, description or accessibility feature.
                                </p>
                            </div>

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

                        </div>

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

                {flash.success && (
                    <div
                        role="status"
                        className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800"
                    >
                        {flash.success}
                    </div>
                )}

                <section className="mt-16 rounded-2xl bg-white p-8 shadow-sm">
                    <div className="max-w-2xl">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
                            Make an enquiry
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900">
                            Interested in one of these stays?
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Send us your details and accessibility requirements and we'll get
                            back to you.
                        </p>

                        <form
                            onSubmit={submitEnquiry}
                            className="mt-8 space-y-6"
                            noValidate
                        >
                            <div>
                                <label
                                    htmlFor="accommodation_id"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Accommodation
                                </label>

                                <select
                                    id="accommodation_id"
                                    value={enquiryForm.data.accommodation_id}
                                    onChange={(event) =>
                                        enquiryForm.setData(
                                            'accommodation_id',
                                            event.target.value,
                                        )
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                >
                                    <option value="">Choose an accommodation</option>

                                    {accommodations.map((accommodation) => (
                                        <option
                                            key={accommodation.id}
                                            value={accommodation.id}
                                        >
                                            {accommodation.name}
                                        </option>
                                    ))}
                                </select>

                                {enquiryForm.errors.accommodation_id && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {enquiryForm.errors.accommodation_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={enquiryForm.data.name}
                                    onChange={(event) =>
                                        enquiryForm.setData('name', event.target.value)
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                />

                                {enquiryForm.errors.name && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {enquiryForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={enquiryForm.data.email}
                                    onChange={(event) =>
                                        enquiryForm.setData('email', event.target.value)
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                />

                                {enquiryForm.errors.email && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {enquiryForm.errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Phone
                                    <span className="ml-1 font-normal text-slate-500">
                                        (optional)
                                    </span>
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    value={enquiryForm.data.phone}
                                    onChange={(event) =>
                                        enquiryForm.setData('phone', event.target.value)
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                />

                                {enquiryForm.errors.phone && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {enquiryForm.errors.phone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-semibold text-slate-900"
                                >
                                    Accessibility requirements or message
                                </label>

                                <textarea
                                    id="message"
                                    rows={5}
                                    value={enquiryForm.data.message}
                                    onChange={(event) =>
                                        enquiryForm.setData('message', event.target.value)
                                    }
                                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
                                />

                                {enquiryForm.errors.message && (
                                    <p className="mt-2 text-sm text-red-700">
                                        {enquiryForm.errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={enquiryForm.processing}
                                className="rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {enquiryForm.processing
                                    ? 'Sending enquiry…'
                                    : 'Send enquiry'}
                            </button>
                        </form>
                    </div>
                </section>

            </div>
        </main>
    );
}