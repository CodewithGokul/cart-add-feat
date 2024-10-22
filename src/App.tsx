import React, { useState } from "react";
import data from "./data";
import "./App.css";

type cartlist = {
  category: string;
  name: string;
  price: number;
};


function App() {
  const [cartEnabled, setCartEnabled] = useState(new Array(9).fill(false));
  const [cartValue, setCartValue] = useState(new Array(9).fill(0));
  const [cartList, setCartList] = useState<cartlist[]>([]);

  const cartEnabledHandler = (i: number) => {
    setCartEnabled(
      cartEnabled.map((bool, index) => (index === i ? true : bool))
    );
  };

  const Decrement = (i: number) => {

    setCartValue(cartValue.map((val, index) => (index === i ? val - 1 : val)));

    setCartList(cartList.filter((_,index)=>(index!==i)))

    console.log(cartList);
  };
 
  const Increment = (i: number) => {

    const obj: cartlist = {
      category: data[i].category,
      name: data[i].name,
      price: data[i].price,
    };
    setCartList((curntVal) =>([...curntVal, obj]));
    setCartValue(cartValue.map((val, index) => (index === i ? val + 1 : val)));
  };
  return (
    <>
      <div className="container">
        <div className="cart-container">
          <h1>Desserts</h1>
          {data.map((_, i: number) => (
            <div className="box">
              <div className="img">
                <img className="image-cart" src={data[i].image.desktop} />
              </div>

              {!cartEnabled[i] ? (
                <button
                  className="cart-btn"
                  onClick={() => {
                    cartEnabledHandler(i);
                    Increment(i);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                cartEnabled[i] && (
                  <button className="btn-added">
                    <div className="minus btn-action" onClick={() => Decrement(i)}>
                      -
                    </div>
                    <div className="count">{cartValue[i]}</div>
                    <div className="plus btn-action" onClick={() => Increment(i)}>
                      +
                    </div>
                  </button>
                )
              )}
                <div className="food-category">{data[i].category}</div>
                <div className="food-name">{data[i].name}</div>
                <div className="price">{data[i].price}</div>
              </div>
          ))}
        </div>

        <div className="your-cart">
          {cartList.length === 0 ? (
            <>
              <img src="src/assets/illustration-empty-cart.svg" />
              <h4>Your Items Will Be Added here!</h4>
            </>
          ) : (
            cartList.map((val: cartlist,_) => (
              <>
                  <div className="cart-category cart-list-child">{val.category}</div>
                  <div className="cart-name cart-list-child">{val.name}</div>
                  <div className="cart-price cart-list-child">{val.price}</div>
              </>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
