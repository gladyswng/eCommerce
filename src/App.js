import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminToolbar from './components/AdminToolbar';
import { UserContext } from './context/user';

import './default.scss'
import { auth } from './firebase/utils';
import useAdminAuth from './hooks/useAdminAuth';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Admin from './pages/Admin';
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration'
import { fetchUser, selectUser } from './state/userSlice';

function App() {
  const dispatch = useDispatch()
  // const currentUser = null
  const currentUser = useFirebaseAuth()
  const adminUser = useAdminAuth()
  console.log(adminUser)
  

  
  return (
    <div className="App">
      {/* <UserContext.Provider value={{ currentUser }}> */}
        {adminUser && <AdminToolbar />}
    
        <Switch>
          <Route path="/" exact >
            <HomepageLayout >
              <Homepage />
            </HomepageLayout>
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
            !adminUser?          
            <Redirect to="/"/> 
            : 
            (<MainLayout>
              <Admin />
            </MainLayout>)
          }>
          </Route> 
          

        </Switch>

      {/* </UserContext.Provider> */}


    </div>
  );
}

export default App;
