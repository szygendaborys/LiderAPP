import React from 'react';

import SignOutBtn from '../SignOutBtn'

import '../../scss/Navbar.scss'
import '../../scss/NavbarAdm.scss'

const AdminNavbar = () => (
    <div className='navibar nav-adm'>
        <h5>Panel Admina</h5>
        <div className='navbar-admin'>
            <div className='link link__active'>Posty</div>
            <SignOutBtn />

        </div>
    </div>
)
    
export default AdminNavbar;