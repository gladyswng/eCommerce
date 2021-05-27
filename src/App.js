import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { UserContext } from './context/user';

import './default.scss'
import { auth } from './firebase/utils';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage'
import Login from './pages/Login';
import Registration from './pages/Registration'

function App() {
  const currentUser = useFirebaseAuth()


  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser }}>
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
          
          

        </Switch>

      </UserContext.Provider>
      {/* <Header />
      <div className="main">
      </div> */}

    </div>
  );
}

export default App;
