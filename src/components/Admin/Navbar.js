import React from 'react';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import SignOutBtn from '../SignOutBtn'

import '../../scss/Navbar.scss'
import '../../scss/NavbarAdm.scss'

const AdminNavbar = () => (
    <div className='navibar nav-adm'>
        <h5>Panel Admina</h5>
        <div className='navbar-admin'>
            <div className='link link__active'>Posty</div>
            <SignOutBtn />
            <Link className='link' to={ROUTES.ADMINPANELMATCHES}>Mecze</Link>
        </div>
    </div>
)
    
export default AdminNavbar;