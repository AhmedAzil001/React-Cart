import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";



const Cart = () => {
  const { cartItem,subTotal,tax,shipping,total } = useSelector((state) => state.cart);
  const dispatch= useDispatch();

  const decrement= (id)=> {
    dispatch( { type:"decrement", payload: id} )
    dispatch( {type:"getPrice"} );
  }

  const increment= (id)=> {
    dispatch( { type:"increment", payload: id} )
    dispatch( {type:"getPrice"} );
  }

  const deleteItem= (id) => {
    dispatch( { type:"delete", payload:id });
    dispatch( {type:"getPrice"} );
  }
  return (
    <div className="cart">
      <main>
        {cartItem.length > 0 ? (
          cartItem.map((item) => (
            <CartItem
              img={item.img}
              price={item.price}
              name={item.name}
              id={item.id}
              quatity={item.quantity}
              key={item.id}
              decrement={decrement}
              increment={increment}
              deleteHandler={deleteItem}
            />
          ))
        ) : (
          <h1>No item Yet</h1>
        )}
      </main>

      <aside>
        <h2>Subtotal : ${subTotal}</h2>
        <h2>Shpping : ${shipping}</h2>
        <h2>Tax : ${tax}</h2>
        <h2>Total : ${total}</h2>
      </aside>
    </div>
  );
};


const CartItem = ({
  img,
  name,
  price,
  quatity,
  increment,
  decrement,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={img} alt="item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{quatity}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;
