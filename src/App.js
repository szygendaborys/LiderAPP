import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withFirebase } from './components/Firebase'

import './scss/App.scss';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Team from './components/Team';
import SignInPage from './components/SignInPage';
import Admin from './components/Admin/Adminpanel';

import * as ROUTES from './constants/routes';


class App extends Component {

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => this.props.onSetAuthUser(authUser));
    console.log(this.props.firebase)
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){
  return (
    <div className="App">
      <h1>My app</h1>
      <Router>
       <Navbar />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.TEAM} component={Team} />
        <Route path={ROUTES.SIGNINPAGE} component={SignInPage} />
        <Route path={ROUTES.ADMINPANEL} component={Admin} />
      </Router>

      

    </div>
  );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetAuthUser: authUser =>
      dispatch({ type: 'AUTH_USER_SET', authUser }),
})

export default compose(withFirebase, connect(mapStateToProps, mapDispatchToProps))(App);
