import React, { useEffect } from "react";
import useCartStore from "./cartStore"; // Adjust the import path as needed

const Cart = () => {
  const { cartItems, error, successMessage, saveCart } = useCartStore(
    (state) => ({
      cartItems: state.cartItems,
      error: state.error,
      successMessage: state.successMessage,

      saveCart: state.saveCart,
    })
  );

  return (
    <div className="bg-heading">
      <div className="flex flex-col">
        <h1 className="text-5xl font-primary text-button text-center">
          Items in Cart
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <ul className="grid grid-cols-4 max-sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[2rem] items-center ml-[2rem] mb-[2rem] max-sm:ml-[10rem]">
          {cartItems.map((item, index) => (
            <li key={item.foodItem?._id || index}>
              {item.foodItem ? (
                <>
                  <h2 className="font-primary text-4xl text-dark">
                    {item.foodItem.name || "Name not available"}
                  </h2>
                  <p className="font-secondary text-xl text-dark">
                    {item.foodItem.description || "Description not available"}
                  </p>
                  <p className="font-secondary text-2xl text-gray">
                    Price: ${item.foodItem.price || "N/A"}
                  </p>
                  <p className="font-secondary text-2xl text-gray">
                    Quantity: {item.quantity || "N/A"}
                  </p>
                  {item.foodItem.image ? (
                    <img
                      src={item.foodItem.image}
                      alt={item.foodItem.name || "Food item"}
                      width="300"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </>
              ) : (
                <p>Food item not available</p>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={saveCart}
          className="bg-button text-white px-4 py-2 mt-4 mx-auto">
          Save Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
