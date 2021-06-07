import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { auth, fireStore } from '../firebase/utils'


export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ filterType, lastDocIndex=null, persistProducts=[] }) => {
  const pageSize = 3

  let productRef = fireStore.collection('products').orderBy('createdDate')
 
  if (filterType)  {
    productRef = productRef.where('productCategory', '==', filterType ) 
  }
  // test pagination startafter

  if (lastDocIndex) {
    const snapshot = await productRef.get()
    const startAfterDoc = snapshot.docs[lastDocIndex]
    
    productRef = productRef.startAfter(startAfterDoc)
  }

  try {
    const snapshot = await productRef.limit(pageSize).get()
    const totalCount =  snapshot.size
    const productList =  [
      ...persistProducts,
      ...snapshot.docs.map(doc => {
      return {
        ...doc.data(),
        createdDate: doc.data().createdDate.toDate().toString(),
        documentID: doc.id
      }
    })]
    console.log(productList)
   
    // to get the last element in the array [-1]
  
    return {
      productList,
      lastDocIndex: productList.length -1,
      isLastPage: totalCount < pageSize
      // queryDoc: snapshot.docs[totalCount -1],
      
    }

  } catch (err) {
    console.log(err)
  }
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
    
    
    const updatedProducts =  await (await thunkAPI.dispatch(fetchProducts({}))).payload.productList
    
    console.log(updatedProducts)
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


const productsAdapter = createEntityAdapter({
  selectId: (product) =>  product.documentID

})

const initialState = productsAdapter.getInitialState({
  status: 'idle',
  error: null,
  lastDocIndex: null,
  isLastPage: null
})


const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // productAdded: productsAdapter.addOne,
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
   
      const { productList, lastDocIndex, isLastPage } = action.payload
     
      productsAdapter.setAll(state, productList)
      state.lastDocIndex = lastDocIndex
      state.isLastPage = isLastPage

    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error= action.error.message
    },
    [addProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      productsAdapter.setAll(state, action.payload)
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      productsAdapter.removeOne(state, action.payload)
    }


  }
  
})

export const {  } = productSlice.actions

export const { 
  selectAll: selectAllProducts,
  selectById: selectProductById

} = productsAdapter.getSelectors(state => state.products)

export default productSlice.reducer
