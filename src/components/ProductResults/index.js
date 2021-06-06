import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from '../../state/productSlice'
import Product from './Product'
import './styles.scss'
import FormSelect from '../forms/FormSelect'
import LoadMore from '../LoadMore'

const ProductResults = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const { filterType } = useParams()


  // state
  const products = useSelector(selectAllProducts)
  const {status:productsStatus, isLastPage, lastDocIndex} = useSelector(({ products }) => products)
 
  
  // const isLastPage = useSelector(({ produ }))
  
  useEffect(() => {
    // maybe set local status when need to fetch multiple times
    // if (productsStatus === 'idle') {
    //   console.log('dispatch param', filterType)
    // }
    dispatch(fetchProducts({ filterType }))

  }, [productsStatus, dispatch, filterType])


  const handleFilter = (e) => {

    const nextFilter = e.target.value;
    console.log('push', nextFilter)
    history.push(`/search/${nextFilter}`);
  }

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        filterType,
        lastDocIndex,
        persistProducts: products
      })
    )
  };

  if (products?.length < 1 ) {
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
        {products?.map(product => {
          const {productName, productPrice, documentID } = product
          // if (!Object.values(product).every(Boolean)) return null
          if (![productName, productPrice, documentID].every(Boolean)) return null

          const configProduct = {productName, productPrice, documentID }
          return <Product {...configProduct} key={documentID}/>
        })}

      </div>

      {!isLastPage && <LoadMore onLoadMoreEvt={handleLoadMore}/>}
    </div>

  )
}
export default ProductResults