import React from 'react';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Layout>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/home" component={Home}></Route>
        </Switch>
        </Layout>
      </BrowserRouter>

    )
  }
}

export default App;
