import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { auth, fireStore } from '../firebase/utils'


export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ filterType }) => {
  
  let productRef = fireStore.collection('products')
 
  if (filterType)  {
    productRef = productRef.where('productCategory', '==', filterType ) 
  }
  
  try {
    const snapshot = await productRef.get()
    const productList =  snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        createdDate: doc.data().createdDate.toDate().toString(),
        documentID: doc.id
      }
    })
    console.log(productList)
    return productList

  } catch (err) {
    console.log(err)
  }
})

const productsAdapter = createEntityAdapter({
  selectId: (product) =>  product.documentID

})


export const addProduct = createAsyncThunk('products/addProduct', async (product, thunkAPI) =>  {
  const productDoc = {
    ...product,
    prooductAdminUID:  auth.currentUser.uid,
    createdDate: new Date()
  }
  
  try {
    fireStore
      .collection('products')
      .doc()
      .set(productDoc)

    const updatedProducts =  thunkAPI.dispatch(fetchProducts())
    return updatedProducts
  } catch (err) {
    console.log(err)
  }
  
}) 

export const removeProduct = createAsyncThunk('products/removeProduct', async (documentID, thunkAPI) => {
  try {
    fireStore.collection('products').doc(documentID).delete()
    return documentID
  } catch (err) {
    console.log(err)
  }
})


const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: productsAdapter.getInitialState({
      status: 'idle',
      error: null
    }),
    
  },
  reducers: {
    // productAdded: productsAdapter.addOne,
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      productsAdapter.setAll(state.products, action.payload)
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error= action.error.message
    },
    [addProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      productsAdapter.upsertMany(state.products, action.payload)
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      productsAdapter.removeOne(state.products, action.payload)
    }


  }
  
})

export const {  } = productSlice.actions

export const { selectAll: selectAllProducts} = productsAdapter.getSelectors(state => state.product.products)
export default productSlice.reducer
