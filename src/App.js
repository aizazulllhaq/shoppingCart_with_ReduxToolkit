import React, { useEffect, useState } from 'react';
import './App.css';
import { Cart } from './features/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import Products from './features/Products/Products';
import { fetchAsync } from './features/Cart/cartSlice';


function App() {

  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const items = useSelector(state => state.cart.items);

  useEffect(() => {

    dispatch(fetchAsync());

  }, [])

  return (
    <div className="App">

      <button onClick={() => setShowCart(!showCart)}>Cart [ { items.length} ] </button>

      {showCart ? <Cart /> : <Products />}

    </div>
  );
}

export default App;
