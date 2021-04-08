import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext, useState } from 'react';
import Destination from './components/Destination/Destination';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext(); 

function App() {

  const [loggedInUser, setLoggedInUser] = useState({}); //one person can log in or not so it is initially empty

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h3>User Name: {loggedInUser.name}</h3>
      
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/destination/:vehicle">
            <Destination />
          </Route>

          {/* <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute> */}

          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
