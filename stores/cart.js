import { defineStore } from 'pinia'

function stringReplace(number) {
  const input =  number.replace("₹", "")

}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  actions: {
    addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.uuid === item.uuid);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(item) {
      const index = this.cartItems.findIndex(cartItem => cartItem.uuid === item.uuid);
      if (index !== -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
    clearCart() {
      this.cartItems = [];
    },
  },
  getters: {
    totalItems: (state) => state.cartItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.cartItems.reduce((total, item) => total + parseFloat(item.properties.price.replace("₹", '')) * item.quantity, 0),
    getState: (state) => state.cartItems,
  },
  persist: true,
})
