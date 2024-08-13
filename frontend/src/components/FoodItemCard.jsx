import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import useCartStore from "./cartStore";

const FoodItemCard = ({ _id, name, description, price, image, special }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [message, setMessage] = useState(""); // State to hold success or error messages

  // Get the addToCart function from your zustand store
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    try {
      console.log("Adding food item ID:", _id);

      // Add the item to the cart locally
      addToCart({ _id, name, image, description, price, quantity: 1 });

      setMessage("Item added to cart successfully!");
    } catch (err) {
      console.error("Error adding item to cart", err);
      setMessage("Failed to add item to cart.");
    }
  };

  return (
    <div
      ref={ref}
      className={`flex hover:scale-90 flex-row gap-[2rem] transition-opacity duration-700 ease-in-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}>
      <img
        src={image}
        alt={name}
        className={`w-52 h-52 object-cover mb-4 ${
          special ? "rounded-full" : "rounded-lg"
        }`}
      />
      <div className="flex flex-col ">
        <h2 className="font-bold font-primary text-4xl text-dark">{name}</h2>
        <p className="text-gray-600 font-secondary whitespace-nowrap mt-4">
          {description}
        </p>
        <p className="text-lg font-semibold font-secondary mt-4">Rs {price}</p>
        {!special && (
          <button
            onClick={handleAddToCart}
            className="mt-8 text-heading font-button bg-button h-12 font-semibold uppercase w-fit py-2 hover:bg-red-500 whitespace-nowrap">
            Add to Cart
          </button>
        )}
        {message && (
          <p
            className={`mt-4 ${
              message.includes("Failed") ? "text-red-500" : "text-green-500"
            }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default FoodItemCard;
