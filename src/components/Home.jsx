import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
const img1 ="https://www.reliancedigital.in/medias/Apple-MGN63HNA-Laptops-491946461-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxNzczNDJ8aW1hZ2UvanBlZ3xpbWFnZXMvaDVhL2gyZC85NDQzMDgzNTgzNTE4LmpwZ3xhYzRiNWIxZGQ2NjNiNWIyYjI0Y2ZkYTZlZWQ3MTFjZTMxYzVmNDBiNmM5Mzk5OTM2OGVkZmExMjMyYjIxNDQ4";
const img2="https://i.pinimg.com/474x/79/de/08/79de08f860694c52157db6f8c511c718.jpg"
const img3="https://external.webstorage.gr/mmimages/image/90/45/99/4/1718785-APPLE-IPHONE-14-256GB-BLUE-hero-560x560.jpg"
const Home = () => {

  const productList = [
    {
      img: img1,
      name: "Mac Book",
      price: 50000,
      id: 1,
    },
    {
      img: img2,
      name: "Nike Shoes",
      price: 5000,
      id: 2,
    },
    {
      img: img3,
      name: "iPhone 14 Pro",
      price: 60000,
      id: 3,
    },
  ];

  const dispatch=useDispatch();

  const addToCartHandler = (options) => {
    dispatch( {type:"addToCart" , payload:options} );
    dispatch( {type:"getPrice"} );
    toast.success("Added to Cart")
  };

  return (
    <div className="home">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          img={product.img}
          name={product.name}
          price={product.price}
          handler={addToCartHandler}
          id={product.id}
        />
      ))}
    </div>
  );
};

const ProductCard = ({ img, name, price, handler, id }) => (
  <div className="card">
    <img src={img} alt={name} />
    <p>{name}</p>
    <h4>${price}</h4>
    <button
      onClick={() => {
        handler({name, img, quantity:1, id, price});
      }}
    >
      Add to Cart
    </button>
  </div>
);

export default Home;
