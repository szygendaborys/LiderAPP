import React from 'react'
import { withFirebase } from './Firebase'

import '../scss/NavbarAdm.scss'

const SignOutBtn = ({ firebase }) => (
    <button className='signout-btn' type="button" onClick={firebase.doSignOut}>
      Wyloguj
    </button>
  );

export default withFirebase(SignOutBtn);