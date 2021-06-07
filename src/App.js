import './default.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { checkUserIsAdmin } from './Utils';

import AdminToolbar from './components/AdminToolbar';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import AdminLayout from './layouts/AdminLayout';
import DashBoardLayout from './layouts/DashboardLayout';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration';
import { fetchProducts, selectAllProducts } from './state/productSlice';
import { fetchUser, selectUser } from './state/userSlice';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';

function App() {
  const dispatch = useDispatch()
  // const currentUser = null
  const currentUser = useFirebaseAuth()
  // const adminUser = useAdminAuth()
  // console.log(adminUser)

 
  return (
    <div className="App">
      {/* <UserContext.Provider value={{ currentUser }}> */}
        {checkUserIsAdmin(currentUser) && <AdminToolbar />}
    
        <Switch>
          <Route path="/" exact >
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
          </Route>
          <Route path="/search/:filterType" >
            <MainLayout>
              <Search />
            </MainLayout>
          </Route>
          <Route path="/search" >
            <MainLayout>
              <Search />
            </MainLayout>
          </Route>
          <Route path="/product/:productID" >
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          </Route>
          <Route path="/registration" render={() => 
            currentUser ?          
            <Redirect to="/"/> 
            : 
            (<MainLayout>
              <Registration />
            </MainLayout>)
          }> 
          </Route>


          <Route path="/login" render={() => 
            currentUser ?          
            <Redirect to="/"/> 
            : 
            (<MainLayout>
              <Login />
            </MainLayout>)
          }> 
          </Route>
          
          <Route path="/recovery" >
            <MainLayout>
              <Recovery />

            </MainLayout>
          </Route>
          
          {/* <Route path="/admin" >
            <MainLayout>
              <Admin />

            </MainLayout>
          </Route> */}
          <Route path="/admin" render={() => 
            !checkUserIsAdmin(currentUser)?       
            <Redirect to="/"/> 
            : 
            (
              <AdminLayout>
                <Admin />

              </AdminLayout>
            )
          }>
          </Route> 
          <Route path="/dashboard" render={() => (
            <DashBoardLayout>
              <Dashboard />
            </DashBoardLayout>
          )}

          />

        </Switch>

      {/* </UserContext.Provider> */}


    </div>
  );
}


export default App
