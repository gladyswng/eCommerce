import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Women from '../../../assets/women.jpg'
import { addToCart } from '../../../state/cartSlice'
import Button from '../../forms/Button'

const Product = (product) => {
  const dispatch = useDispatch()
  const { productName, productPrice, documentID } = product
  if (!productName || !productPrice) return null


  const handleAddToCart = (product) => {
  
    dispatch(
      addToCart(product)
    );
    // history.push('/cart');
  }



  return (
    <div className="product">
      <div  className="thumb">
        <img src={Women} alt={productName}/>
      </div>

      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${documentID}`}>
            <span className="name">
              {productName}
            </span>
            </Link>
          </li>
          <li>
            <span className="price">
              $  {productPrice}
            </span>
          </li>
          <div className="addToCart">
            <Button type="button"  onClick={() => handleAddToCart(product)}>Add to cart</Button>

          </div>
        </ul>
      </div>
      
    </div>
  )
}
export default Product