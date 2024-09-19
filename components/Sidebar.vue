<template>
               <div class="hidden space-y-4 lg:block">
                                        <div>
                                            <label for="SortBy" class="block text-xs font-medium text-gray-700"> Sort By
                                            </label>

                                            <select id="SortBy" class="mt-1 rounded border-gray-300 text-sm">
                                                <option>Sort By</option>
                                                <option value="Title, DESC">Title, DESC</option>
                                                <option value="Title, ASC">Title, ASC</option>
                                                <option value="Price, DESC">Price, DESC</option>
                                                <option value="Price, ASC">Price, ASC</option>
                                            </select>
                                        </div>

                                        <div>
                                            <p class="block text-xs font-medium text-gray-700">Filters</p>

                                            <div class="mt-1 space-y-2">
                                                

                                                <details
                                                    class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                                                    <summary
                                                        class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                                                        <span class="text-sm font-medium"> Price </span>

                                                        <span class="transition group-open:-rotate-180">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                class="h-4 w-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                            </svg>
                                                        </span>
                                                    </summary>

                                                    <div class="border-t border-gray-200 bg-white">
                                                        <header class="flex items-center justify-between p-4">
                                                            <span class="text-sm text-gray-700"> The highest price is $600
                                                            </span>

                                                            <button type="button"
                                                                class="text-sm text-gray-900 underline underline-offset-4">
                                                                Reset
                                                            </button>
                                                        </header>

                                                        <div class="border-t border-gray-200 p-4">
                                                            <div class="flex justify-between gap-4">
                                                                <label for="FilterPriceFrom"
                                                                    class="flex items-center gap-2">
                                                                    <span class="text-sm text-gray-600">$</span>

                                                                    <input type="number" id="FilterPriceFrom"
                                                                        placeholder="From"
                                                                        class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                                                                </label>

                                                                <label for="FilterPriceTo" class="flex items-center gap-2">
                                                                    <span class="text-sm text-gray-600">$</span>

                                                                    <input type="number" id="FilterPriceTo" placeholder="To"
                                                                        class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </details>

                                               
                                            </div>
                                        </div>
                                    </div>
</template>