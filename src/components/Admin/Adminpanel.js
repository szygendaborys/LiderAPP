import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withAuthorisation } from '../Session'
import { withFirebase } from '../Firebase'

import AdminPostMng from './AdminPostMng';
import AdminNavbar from './Navbar';

const Adminpanel = ({authUser}) => (
<div>{authUser ? <AdminpanelAuth /> : <AdminpanelNonAuth />}</div>
)

class AdminpanelAuth extends Component {
    render() {  
        return (
            <div>
                <AdminNavbar />
                <AdminPostMng />
            </div>
        )
    }
}

const AdminpanelNonAuth = () => (
    <div>
        <h1>You do not have permission to visit this page.</h1>
    </div>
)

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  });

const condition = authUser => !!authUser

export default compose(withAuthorisation(condition), connect(mapStateToProps),withFirebase)(Adminpanel);