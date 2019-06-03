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
import Trainings from './components/Trainings';
import SignInPage from './components/SignInPage';
import Admin from './components/Admin/Adminpanel';

import * as ROUTES from './constants/routes';


class App extends Component {

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => this.props.onSetAuthUser(authUser));
  }

  componentWillUnmount() {
    this.listener();
  }

  render(){
  return (
    <div className="App">
      <div className='sponsors' id='sponsors'>
        <h1>Sponsors</h1>
      </div>
      <img 
        className='logo'
        src='https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/logo.png?alt=media&token=ec448096-b17e-4cad-9901-760a6943eb40' 
        alt='logo.png' 
      />
      <Router>
       <Navbar />

        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.TEAM} component={Team} />
        <Route path={ROUTES.TRAININGS} component={Trainings} />
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
