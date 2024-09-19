<template>
    <div>
        <div class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
            <div v-if="!searchMade">

                <section class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right"
                    style="max-width:1600px; height: 32rem; background-image: url('cover-1.png');">
                    <div class="container mx-auto">

                        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
                            <div class="hero-headline flex flex-col items-center justify-center pt-24 text-center">
                                <h1 class=" font-bold text-3xl text-white">Look for your weekly hike</h1>
                                <p class=" font-base text-base text-white">our spark assistant is here to give you
                                    everything</p>
                                <p class=" font-base text-base text-white">you need to go from couch to
                                    mountain or valley</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="bg-white py-2">
                    <div class="container py-2 px-6 mx-auto">
                        <div class="hero-headline flex flex-col items-center justify-center pt-24 text-center">
                            <h1 class=" font-bold text-3xl text-gray-900">What type of hike are you looking for?</h1>
                            <p class=" font-base text-base text-gray-600">"try a nice and easy hike close to mumbai with
                                some lovely waterfalls"</p>
                        </div>

                        <div class="box pt-6">
                            <div class="box-wrapper">
                                <div
                                    class=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                                    <button class="outline-none focus:outline-none"><svg
                                            class=" w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg></button>
                                    <input v-model="searchTerm" type="search" name="" id=""
                                        placeholder="a nice easy hike close to mumbai" x-model="q"
                                        class="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent">
                                    <div>
                                        <button @click="submitSearch"> Gooo
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            <div v-if="loading" class="flex justify-center items-center">
                <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
                    <svg class="h-16 w-16 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24">
                        </line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24">
                        </line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24">
                        </line>
                    </svg>
                    <span class="text-l font-medium text-gray-500">gorping</span>
                </div>
            </div>

            <div v-if="searchMade">
                <section
                    class="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right pb-8"
                    style="max-width:1600px; height: 16rem; background-image: url('cover-2.png');">

                    <div class="container mx-auto">

                        <div class="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
                            <h1 class="text-white text-4xl my-4">we present to you your hike </h1>

                        </div>
                    </div>
                </section>

                <section class="bg-white pt-4 mt-8">
                    <div class="container px-6 mx-auto">
                        <vue-markdown-it :source="searchResult.generated.split('@')[0]" />
                    </div>
                </section>

                <section class="bg-white">

                    <div class="container mx-auto flex items-center flex-wrap pb-12">

                        <nav id="store" class="w-full z-30 top-0 px-4 py-1">
                            <div
                                class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

                                <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-l "
                                    href="#">
                                    buy these for your hike
                                </a>

                            </div>
                        </nav>

                        <div class="lg:col-span-4">
                            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">


                                <li>
                                    <a href="#" class="group block overflow-hidden">
                                        <img :src="productResult.item1[0].properties.image" alt=""
                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                        <div class="relative bg-white pt-3">
                                            <h3
                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {{ productResult.item1[0].properties.name.slice(0, 80) }}...
                                            </h3>

                                            <p class="mt-2">
                                                <span class="sr-only"> Regular Price </span>

                                                <span class="tracking-wider text-gray-900">
                                                    ${{ parseFloat(productResult.item1[0].properties.price.replace("₹", ''))
                                                    }}</span>
                                            </p>

                                        </div>
                                    </a>
                                    <button @click="addToCart(productResult.item1[0])"
                                        class="bg-blue-300 text-white p-1">Add to Cart</button>

                                </li>

                                <li>
                                    <a href="#" class="group block overflow-hidden">
                                        <img :src="productResult.item2[0].properties.image" alt=""
                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                        <div class="relative bg-white pt-3">
                                            <h3
                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {{ productResult.item2[0].properties.name.slice(0, 80) }}...
                                            </h3>

                                            <p class="mt-2">
                                                <span class="sr-only"> Regular Price </span>

                                                <span class="tracking-wider text-gray-900">
                                                    ${{ parseFloat(productResult.item2[0].properties.price.replace("₹", ''))
                                                    }}</span>
                                            </p>

                                        </div>
                                    </a>
                                    <button @click="addToCart(productResult.item2[0])"
                                        class="bg-blue-300 text-white p-1">Add to Cart</button>

                                </li>

                                <li>
                                    <a href="#" class="group block overflow-hidden">
                                        <img :src="productResult.item3[0].properties.image" alt=""
                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                        <div class="relative bg-white pt-3">
                                            <h3
                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {{ productResult.item3[0].properties.name.slice(0, 80) }}...
                                            </h3>

                                            <p class="mt-2">
                                                <span class="sr-only"> Regular Price </span>

                                                <span class="tracking-wider text-gray-900">
                                                    ${{ parseFloat(productResult.item3[0].properties.price.replace("₹", ''))
                                                    }}</span>
                                            </p>

                                        </div>
                                    </a>
                                    <button @click="addToCart(productResult.item3[0])"
                                        class="bg-blue-300 text-white p-1">Add to Cart</button>

                                </li>

                                <li>
                                    <a href="#" class="group block overflow-hidden">
                                        <img :src="productResult.item4[0].properties.image" alt=""
                                            class="h-[350px] w-[350px] object-none transition duration-500 group-hover:scale-105 sm:h-[350px]" />

                                        <div class="relative bg-white pt-3">
                                            <h3
                                                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                                                {{ productResult.item4[0].properties.name.slice(0, 80) }}...
                                            </h3>

                                            <p class="mt-2">
                                                <span class="sr-only"> Regular Price </span>

                                                <span class="tracking-wider text-gray-900">
                                                    ${{ parseFloat(productResult.item4[0].properties.price.replace("₹", ''))
                                                    }}</span>
                                            </p>

                                        </div>
                                    </a>
                                    <button @click="addToCart(productResult.item4[0])"
                                        class="bg-blue-300 text-white p-1">Add to Cart</button>

                                </li>

                            </ul>
                        </div>

                    </div>

                </section>
            </div>

        </div>
    </div>
</template>

<script setup>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';
import { useCartStore } from '~/stores/cart'


const cartStore = useCartStore()
const { addToCart } = cartStore

const searchMade = ref(false)
const productLoading = ref(false)
const loading = ref(false)
const searchTerm = ref('')
const searchResult = ref()
const productResult = ref()

async function submitSearch() {
    searchResult.value = null
    loading.value = true
    productLoading.value = true
    searchResult.value = await $fetch(`/api/gensearch?query=${searchTerm.value}`)
    productResult.value = await $fetch(`/api/product?query=${searchResult.value.generated.split('@')[1]}`)
    searchMade.value = true
    loading.value = false
    productLoading.value = false
}

</script>
