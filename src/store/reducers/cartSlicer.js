import { createSlice } from "@reduxjs/toolkit";
const userData = localStorage.getItem("loggedInUserData");
console.log(userData);
export const cartSlicer = createSlice({
  name: "cart",
  initialState: {
    cart: userData?.cart ? userData.cart : [],
    totalAmount: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      try {
        const exist = state.cart.find(
          (product) => product.id === productId.id
          //  && product.size === productId.size &&
          // product.color === productId.color
        );
        if (exist) {
          exist.amount++;
          exist.totalPrice += productId.price;
          state.totalAmount++;
          state.totalPrice += productId.price;
        } else {
          state.cart.push({
            id: productId.id,
            price: productId.price,
            totalPrice: productId.price,
            amount: 1,
            // size: productId.size,

            // img: productId.img,

            // name: productId.name,
            // text: productId.text,
            // color: productId.color,
          });
          state.totalAmount++;
          state.totalPrice += productId.price;
        }
      } catch (err) {
        return err;
      }
    },
    // clearCart: (state) => {
    //   state.cart = [];
    // },
    decreaseCart: (state, action) => {
      const productId = action.payload;
      try {
        const exist = state.cart.find(
          (product) =>
            product.id === productId.id &&
            product.size === productId.size &&
            product.color === productId.color
        );
        if (exist.amount === 1) {
          state.cart = state.cart.filter(
            (product) =>
              product.id !== productId.id &&
              product.size !== productId.size &&
              product.color !== productId.color
          );
          state.totalAmount--;
          state.totalPrice -= productId.price;
        } else {
          exist.amount--;
          exist.totalPrice -= productId.price;
          state.totalAmount--;
          state.totalPrice -= productId.price;
        }
      } catch (err) {
        return err;
      }
    },
    // getTotals: (state, action) => {
    //   state.total = state.cart.map((val)=>)
    // },
  },
});
export const { addToCart, decreaseCart } = cartSlicer.actions;
