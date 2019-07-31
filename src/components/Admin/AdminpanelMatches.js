import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withAuthorisation } from '../Session'
import { withFirebase } from '../Firebase'

import AdminNavbar from './Navbar';
import AdminMatches from './AdminMatches'

const AdminpanelMatches = ({authUser}) => (
<div>{authUser ? <AdminpanelAuth /> : <AdminpanelNonAuth />}</div>
)

class AdminpanelAuth extends Component {
    render() {  
        return (
            <div>
                <AdminNavbar />
                <AdminMatches />
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

export default compose(withAuthorisation(condition), connect(mapStateToProps),withFirebase)(AdminpanelMatches);