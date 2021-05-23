import { Route, Switch } from 'react-router-dom';

import './default.scss'
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'

function App() {
  return (
    <div className="App">

        <Switch>
          <Route path="/" exact >
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          </Route>
          <Route path="/registration"> 
            <MainLayout>
             <Registration />
            </MainLayout>
          </Route>

        </Switch>
      {/* <Header />
      <div className="main">
      </div> */}

    </div>
  );
}

export default App;
