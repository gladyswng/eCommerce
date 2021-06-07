import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import ProductCard from "../../components/ProductCard"
import { fetchProducts, selectProductById } from "../../state/productSlice"

const ProductDetails = ({}) => {
  const dispatch = useDispatch()
  const { productID } = useParams()

  const product = useSelector(state => selectProductById(state, productID))
  

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts({}))
    }
    console.log(product)

  }, [product])


  return (
    <div>Product PAGE

      {product && <ProductCard product={product}/>}
    </div>
  )
}
export default ProductDetails