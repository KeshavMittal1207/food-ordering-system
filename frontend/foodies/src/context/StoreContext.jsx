import { createContext, useEffect, useState } from "react";
import { fetchFoodList } from "../service/foodService";
import { addToCart, removeFromCart, fetchCartList } from "../service/CartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token , setToken] = useState("");

  const increaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
    try {
      await addToCart(foodId);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const decreaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: Math.max((prev[foodId] || 0) - 1, 0),
    }));
    try {
      await removeFromCart(foodId);
    } catch (err) {
      console.error("Remove from cart failed", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const foods = await fetchFoodList();
        setFoodList(foods);

        const cartRes = await fetchCartList();
        if (cartRes && cartRes.items) {
          setQuantities(cartRes.items); // items is already { foodId: quantity }
        } else {
          console.warn("Cart response is missing items:", cartRes);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }

    loadData();
  }, []);

  const contextValue = {
    foodList,
    quantities,
    increaseQuantity,
    decreaseQuantity,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
