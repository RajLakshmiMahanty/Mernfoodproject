import React, { createContext, useReducer, useContext } from "react";

// Create context for cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function for managing cart state
const reducer = (state, action) => {
  switch (action.type) {
    // Add item to cart
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    // Remove item from cart
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    // Update item in cart
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    // Drop all items from cart
    case "DROP":
      return [];
    default:
      console.log("Error in Reducer");
  }
};

// Provider component to wrap children with cart context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []); // Initialize cart state using reducer
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hook to access cart state
export const useCart = () => useContext(CartStateContext);

// Custom hook to access cart dispatch
export const useDispatchCart = () => useContext(CartDispatchContext);
