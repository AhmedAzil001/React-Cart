import { createReducer, createAction } from "@reduxjs/toolkit";

const addToCart = createAction("addToCart");
const decrement = createAction("decrement");
const increment = createAction("increment");
const deleteItem= createAction("delete");
const calculatePrice= createAction("getPrice");

export const cartReducer = createReducer(
  {
    cartItem: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  (builder) => {
    builder.addCase(addToCart, (state, action) => {
      const item = action.payload;
      const itemExist = state.cartItem.find((i) => i.id === item.id);
      if (itemExist) {
        state.cartItem.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItem.push(item);
      }
    })
    .addCase(decrement, (state,action) => {
        const id=action.payload;
        state.cartItem.forEach( (item) => {
            if(id===item.id) item.quantity-=1;
            if(item.quantity===0){
                state.cartItem=state.cartItem.filter( item => item.id!==id)
            }
        })
    })
    .addCase(increment, (state,action) => {
        const id=action.payload;
        state.cartItem.forEach( (item) => {
            if(id===item.id) item.quantity+=1;
        })
    })
    .addCase(deleteItem, (state,action) => {
        const id =action.payload;
        state.cartItem=state.cartItem.filter( (item) => item.id!==id)
    })
    .addCase(calculatePrice, (state) => {
        let sum=0;
        state.cartItem.forEach( (item) => { sum+= (item.price * item.quantity) })
        state.subTotal=+sum;
        state.shipping= state.subTotal>1000 ? 0 : 200;
        state.tax= +((state.subTotal * 0.18).toFixed());
        state.total=state.subTotal+state.tax;
        state.shipping=state.total >0? state.shipping : 0;
        state.total+=state.shipping;
    })
  }
);
