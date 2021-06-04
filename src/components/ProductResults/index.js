import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from '../../state/productSlice'
import Product from './Product'
import './styles.scss'
import FormSelect from '../forms/FormSelect'

const ProductResults = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(useParams())
  const { filterType } = useParams()
  const products = useSelector(selectAllProducts)
  const productsStatus = useSelector(({ product }) => product.products.status)
  
  useEffect(() => {
    console.log(filterType)
    if (productsStatus === 'idle') {
      dispatch(fetchProducts({ filterType}))
    }

  }, [productsStatus, dispatch, filterType])
  console.log(products)

   const handleFilter = (e) => {

    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (products.length < 1 ) {
    return (
      <div className="products">
        <p>
          No search results
        </p>
      </div>
    )
  }

  
    const configFilters = {
      // pass dfaultValue to FormSelect
      defaultValue: filterType,
      options: [{
        name: 'Show all',
        value: ''
      }, {
        name: 'Mens',
        value: 'mens'
      }, {
        name: 'Womens',
        value: 'womens'
      }],
      handleChange: handleFilter
    };


  return (
    <div className="products">
      <h1>Browse Products</h1>
      <FormSelect {...configFilters} />
      <div className="productResults">
        {products.map(product => {
          const {productName, productPrice, documentID } = product
          // if (!Object.values(product).every(Boolean)) return null
          if (![productName, productPrice, documentID].every(Boolean)) return null

          const configProduct = {productName, productPrice, documentID }
          return <Product {...configProduct} key={documentID}/>
        })}

      </div>
    </div>

  )
}
export default ProductResults