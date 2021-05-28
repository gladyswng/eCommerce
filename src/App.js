import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserContext } from './context/user';

import './default.scss'
import { auth } from './firebase/utils';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Registration from './pages/Registration'
import { fetchUser, selectUser } from './state/userSlice';

function App() {
  const dispatch = useDispatch()
  
  const currentUser = useFirebaseAuth()
  console.log(currentUser)


  
  return (
    <div className="App">
      {/* <UserContext.Provider value={{ currentUser }}> */}
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
          

        </Switch>

      {/* </UserContext.Provider> */}


    </div>
  );
}

export default App;
