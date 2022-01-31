import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './Pagess/Login';
import {Switch,Route} from 'react-router-dom'
import Registration from './Pagess/Registration';
import Homepage from './Pagess/homepage/Homepage';
import { useState } from 'react';
import ProtectedRoute from './ProtectedRoute';


function App() {
  const [login,setLogin]=useState(false);
  return (
    <> 
        <Switch>
          <Route exact path="/" >
            <Login setLogin={setLogin} login={login}/>
          </Route>
          <Route exact path="/registration" >
            <Registration setLogin={setLogin} login={login}/>
          </Route>
          <ProtectedRoute exact path="/homepage" login={login}>
            < Homepage login={login} setLogin={setLogin}/>
          </ProtectedRoute>  
        </Switch>
    </>
  );
}

export default App;
