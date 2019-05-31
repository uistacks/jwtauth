import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

// import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = '/admin/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div>
                        <Navbar/>
                        <div className='container'>
                            <Route exact path="/admin" component={Home} />
                            <Route exact path="/admin/register" component={Register} />
                            <Route exact path="/admin/login" component={Login} />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;