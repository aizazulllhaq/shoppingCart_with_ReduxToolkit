import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Products.css";
import {
  fetchAsync,
} from './ProductsSlice';
import { addAsync } from '../Cart/cartSlice';

function Products() {

  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchAsync());

  }, [])

  return (
    <div>
      <div>
        <h1>Products</h1>
        <hr/>
        {/* Product Card */}
        {
          products.map((product) => (
            <div className="card">
              <img src={product.images[0]} alt={product.title} style={{
                width: "100%"
              }} />
              <span>Brand : {product.brand} . Stock : {product.stock}</span>
              <h1> {product.title} </h1>
              <p className="price">${product.price}</p>
              <p>{product.description}</p>
              <p><button onClick={() => dispatch(addAsync(product))}>Add to Cart</button></p>
            </div>
          ))
        }

      </div>
    </div >
  );
}

export default Products;