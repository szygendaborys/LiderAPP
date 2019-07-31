import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import '../../scss/App.scss'

const AdminLoginButton = () => (
    <Link className='admin-login__button' to={ROUTES.ADMINPANEL}>></Link>
);

export default AdminLoginButton;