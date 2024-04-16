import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Cart.css";
import {
  deleteAsync,
  fetchAsync,
  updateAsync,
} from './cartSlice';

export function Cart() {

  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleSelectChange = (e, id) => { // get ( quantity-value , id ) 
    // console.log(e.target.value);
    dispatch(updateAsync({ id, change: { quantity: +e.target.value } }));
  }

  useEffect(() => {

    dispatch(fetchAsync())

  }, [])

  return (
    <>
      <h1>Cart</h1>
      <hr />
      {
        items.map((item) => (
          <div className='cart-item'>

            <div className='p'>
              <img className="img-fluid" style={{ width: "100px" }} src={item.images[0]} alt="" />
              <div className='description'>

                <p> {item.title}  </p>
                <span> {item.brand} </span>
                <strong>${item.price} </strong>
                <div className='quantity'>
                  Quantity
                  <select value={item.quantity} onChange={(e) => (handleSelectChange(e, item.id))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>


              </div>
              <div className='close'>

                <button onClick={() => dispatch(deleteAsync(item.id))}>X</button>
              </div>

            </div>

          </div>
        ))
      }
      {
        items.length ? <h1>Total : ${items.reduce((acc, item) => item.price * item.quantity + acc, 0)}</h1> : null
      }

    </>
  );
}
