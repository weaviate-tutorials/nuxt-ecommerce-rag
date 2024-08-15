<template>
    <div>
        <nav id="header" class="w-full z-30 top-0 py-1">
            <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">

                <label for="menu-toggle" class="cursor-pointer md:hidden block">
                    <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 20 20">
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input class="hidden" type="checkbox" id="menu-toggle" />

                <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
                    <nav>
                        <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                            <li><a class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                                    href="/store">Shop</a></li>
                                    <li><a class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                                    href="/rag">Hiking Assistant</a></li>
                        </ul>
                    </nav>
                </div>

                <div class="order-1 md:order-2">
                    <a class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                        href="#">
                        
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24"
                            preserveAspectRatio="xMinYMin" class="fill-current text-gray-800 mr-2 mt-2">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M17.797 10.402c-2.038-.98-5.317-1.604-8.3-1.604-1.828 0-2.951-3.163-3.264-5.235l1.182-2.007a3 3 0 0 1 5.17 0l5.212 8.846zm1.673 2.839l.14.236A3 3 0 0 1 17.024 18H2.975A3 3 0 0 1 .39 13.477l4.517-7.664c.417 2.76 2.144 4.985 4.59 4.985 2.747 0 6.71.536 9.973 2.443z">
                                </path>
                            </g>
                        </svg>
                        GORPGORPGORP
                    </a>
                </div>

                <div class="order-2 md:order-3 flex items-center" id="nav-content">
                    <span>{{ totalItems }}</span>

                    <a class="pl-3 inline-block no-underline hover:text-black" href="/cart">
                        <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                            <circle cx="10.5" cy="18.5" r="1.5" />
                            <circle cx="17.5" cy="18.5" r="1.5" />
                        </svg>
                </a>

            </div>
        </div>
    </nav>

    <slot />
</div></template>

<script setup>
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } = cartStore

</script>