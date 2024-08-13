import { create } from "zustand";
import axios from "axios";

const useCartStore = create((set) => ({
  cartItems: [],
  successMessage: "",
  error: null,

  addToCart: (foodItem) => {
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.foodItem._id === foodItem._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ foodItem, quantity: 1 });
      }
      return { cartItems: [...state.cartItems] };
    });
  },

  saveCart: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      set({ error: "No token found, please log in." });
      return;
    }

    try {
      const cartData = useCartStore.getState().cartItems.map((item) => ({
        foodItem: item.foodItem._id,
        quantity: item.quantity,
      }));

      await axios.post(
        "http://localhost:4000/api/users/cart/save",
        { cart: cartData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ successMessage: "Cart saved successfully!", error: null });
    } catch (err) {
      console.error("Error saving cart items", err);
      set({ error: "Error saving cart items", successMessage: "" });
    }
  },
}));

export default useCartStore;
