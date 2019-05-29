import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

class Navbar extends Component {
    render() {
        return (
            <div>
                NAVBAR HERE
                <ul>
                    <li>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.TEAM}>Drużyna</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.SIGNINPAGE}>Zaloguj</Link>
                    </li>
                    <li>
                        <Link to={ROUTES.ADMINPANEL}>Admin</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar;