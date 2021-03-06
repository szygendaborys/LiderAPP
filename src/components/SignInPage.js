import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from './Firebase';
import * as ROUTES from '../constants/routes';

import '../scss/SignIn.scss';

const INITIAL_STATE = {
    email:'',
    password:'',
    err:null
}

const SignInPage = () => (
    <div className='signin-container'>
      <h1>Dostęp tylko dla zalogowanych</h1>
      <SignInForm />
    </div>
  );

  class SignInFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      const { email, password } = this.state;
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.ADMINPANEL);
          
        })
        .catch(error => {
          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
      console.log(this.props.firebase)
    }
  
    render() {
      const { email, password, error } = this.state;
  
      const isInvalid = password === '' || email === '';
  
      return (
        <form onSubmit={this.onSubmit} className='signin-form'>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Login"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Hasło"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
  
          {error && <p className='err'>{error.message}</p>}
        </form>
      );
    }
  }
  
  const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignInFormBase);
  
  export default SignInPage;
  
  export { SignInForm };