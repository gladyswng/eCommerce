import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Women from '../../assets/women.jpg'
// import { addProduct } from './../../redux/Cart/cart.actions';
import Button from './../forms/Button';
import './styles.scss';
import { fetchProducts, selectProductById } from '../../state/productSlice';
import { addToCart, selectCart, selectTotalItem, selectTotalPrice } from '../../state/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const totalPrice = useSelector(selectTotalPrice)
  const totalItem = useSelector(selectTotalItem)
  
  const {
    productName,
    productPrice,
    productDesc,
  } = product;


  const handleAddToCart = (product) => {
  
    dispatch(
      addToCart(product)
    );
    // history.push('/cart');
  }

  const configAddToCartBtn = {
    type: 'button'
  }

  return (

    <div className="productCard">
      <div className="hero">
        <img src={Women} alt={productName}/>
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>
              {productName}
            </h1>
          </li>
          <li>
            <span>
              £{productPrice}
            </span>
          </li>
          <li>
            <div className="addToCart">
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
            </div>
          </li>
          <li>
            <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: productDesc }} />
          </li>
        </ul>
      </div>
    </div>

  );
}

export default ProductCard;
