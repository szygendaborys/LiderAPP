import React from 'react'
import { withFirebase } from './Firebase'

const SignOutBtn = ({ firebase }) => (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );

export default withFirebase(SignOutBtn);