import { Link } from 'react-router-dom'
import Women from '../../../assets/women.jpg'
import Button from '../../forms/Button'

const Product = ({ productName, productPrice, documentID }) => {
        if (!productName || !productPrice) return null
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
            <Button type="button">Add to cart</Button>

          </div>
        </ul>
      </div>
      
    </div>
  )
}
export default Product