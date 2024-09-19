<template>
    <div>
        <div class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
            <section class="bg-white py-8">
                <div class="container py-8 px-6 mx-auto">
                    <div class="box pt-6">
                        <div class="box-wrapper">
                            <div class=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                                <button class="outline-none focus:outline-none"><svg
                                        class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg></button>
                                <input v-model="searchTerm" type="search" name="" id=""
                                    placeholder="beautifully gorpy salomon sneakers" x-model="q"
                                    class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent">
                                <div>
                                    <button @click="submitSearch"> Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section class="bg-white py-4">

                <div class="container mx-auto flex items-center flex-wrap pb-12">

                    <div v-if="!searchMade">
                        <section>
                            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-4 lg:px-">
                                <header>
                                    <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">product gorpllection</h2>

                                    <p class="mt-4 max-w-md text-gray-500">
                                        gorp is a lifestyle, gorp is a state of mind, gorp. gorp.
                                    </p>
                                </header>

                                <div class="mt-8 block lg:hidden">
                                    <button
                                        class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                                        <span class="text-sm font-medium"> Filters & Sorting </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-4 rtl:rotate-180">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                                    <Sidebar />

                                    <div class="lg:col-span-3">
                                        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


                                            <div v-for="item in products">
                                                <li>
                                                    <a href="#" class="group block overflow-hidden">
                                                        <img :src="item.properties.image" alt=""
                                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                                        <div class="relative bg-white pt-3">
                                                            <h3
                                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                                {{ item.properties.name.slice(0, 80) }}...
                                                            </h3>

                                                            <p class="mt-2">
                                                                <span class="sr-only"> Regular Price </span>

                                                                <span class="tracking-wider text-gray-900">
                                                                    ${{ parseFloat(item.properties.price.replace("₹", ''))
                                                                    }}</span>
                                                            </p>

                                                        </div>
                                                    </a>
                                                    <button @click="addToCart(item)" class="bg-blue-300 text-white p-1">Add
                                                        to Cart</button>

                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div v-if="searchMade">


                        <section>
                            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-4 lg:px-">
                                <header>
                                    <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

                                    <p class="mt-4 max-w-md text-gray-500">
                                        gorp is a lifestyle, gorp is a state of mind, gorp. gorp.
                                    </p>
                                </header>

                                <div class="mt-8 block lg:hidden">
                                    <button
                                        class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
                                        <span class="text-sm font-medium"> Filters & Sorting </span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-4 rtl:rotate-180">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
                                    <Sidebar />

                                    <div class="lg:col-span-3">
                                        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


                                            <div v-for="item in searchResult">
                                                <li>
                                                    <a href="#" class="group block overflow-hidden">
                                                        <img :src="item.properties.image" alt=""
                                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                                        <div class="relative bg-white pt-3">
                                                            <h3
                                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                                {{ item.properties.name.slice(0, 80) }}...
                                                            </h3>

                                                            <p class="mt-2">
                                                                <span class="sr-only"> Regular Price </span>

                                                                <span class="tracking-wider text-gray-900">
                                                                    ${{ parseFloat(item.properties.price.replace("₹", ''))
                                                                    }}</span>
                                                            </p>

                                                        </div>
                                                    </a>
                                                    <button @click="addToCart(item)" class="bg-blue-300 text-white p-1">Add
                                                        to Cart</button>

                                                </li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>


                </div>

            </section>


            <Footer />

        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { nextTick } from 'vue';

const cartStore = useCartStore()
const { addToCart } = cartStore

const searchMade = ref(false)
const loading = ref(false)
const searchTerm = ref('')
const searchResult = ref()

let products = ref({});


onMounted(async () => {
    await nextTick();
    products.value = await $fetch(`/api/init`)
});

async function submitSearch() {
    searchResult.value = null
    loading.value = true
    searchResult.value = await $fetch(`/api/search?query=${searchTerm.value}`)
    searchMade.value = true
    loading.value = false
}

</script>
