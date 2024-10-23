import { useEffect, useState } from "react";
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
  const [total,setTotal] = useState(0);


  useEffect(() => {
    const updatedCartEnabled = cartValue.map((val) => val > 0);
    setCartEnabled(updatedCartEnabled);
  }, [cartValue]);

  
  const Decrement = (name: string, i: number) => {
    // Find index of the item in the cart list
    const itemIndex = cartList.findIndex((val) => val.name === name);

    if (itemIndex > -1) {
      // Decrease the count for the corresponding item
      const newCartValue = cartValue.map((val, index) => (index === i ? val - 1 : val));
      setCartValue(newCartValue);
        const updatedCartList = cartList.filter((_, index) => index !== itemIndex);
        setCartList(updatedCartList);
    }
  };

  const Increment = (i: number) => {
    const obj: cartlist = {
      category: data[i].category,
      name: data[i].name,
      price: data[i].price,
    };

    setCartList((currentVal) => [...currentVal, obj]);

    setCartValue((currentCartValue) =>
      currentCartValue.map((val, ind) => (ind === i ? val + 1 : val))
    );
  };

  return (
    <>
      <div className="container">
        <div className="cart-container">
          <h1>Desserts</h1>
          {data.map((_, i: number) => (
            <div className="box" key={i}>
              <div className="img">
                <img
                  className="image-cart"
                  src={data[i].image.desktop}
                  alt={data[i].name}
                />
              </div>

              {!cartEnabled[i] ? (
                <button
                  className="cart-btn"
                  onClick={() => {
                    Increment(i);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="btn-added">
                  <div
                    className="minus btn-action"
                    onClick={() => {
                      Decrement(data[i].name, i);
                    }}
                  >
                    -
                  </div>
                  <div className="count">{cartValue[i]}</div>
                  <div className="plus btn-action" onClick={() => Increment(i)}>
                    +
                  </div>
                </button>
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
              <img
                src="src/assets/illustration-empty-cart.svg"
                alt="Empty Cart"
              />
              <h4>Your Items Will Be Added here!</h4>
            </>
          ) : (
            <>
            <div className="cart-no">Your Cart ({cartList.length})</div>
              {cartList.map((val: cartlist, idx: number) => (
                <div key={idx}>
                  <div className="cart-category cart-list-child">
                    {val.category}
                  </div>
                  <div className="cart-name cart-list-child">{val.name}</div>
                  <div className="cart-price cart-list-child">{val.price}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
