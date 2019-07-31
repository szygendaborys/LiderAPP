import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withAuthorisation } from '../Session'
import { withFirebase } from '../Firebase'


const AdminMatchesBox = ({authUser}) => (
    <div>{authUser ? <AdminMatchesBoxAuth /> : <AdminMatchesBoxNonAuth />} </div>
)

class AdminMatchesBoxAuth extends Component {
    constructor (props){
        super(props);
    }

    render() {
        return (
            <div>
                Hej jestem sobie strona do okreslonych sezonow. 

                <Link to={'/adminmatches'}>Wróć</Link>
            </div>
        )
    }
}

const AdminMatchesBoxNonAuth = () => (
    <div>
        <h1>You do not have permission to visit this page.</h1>
    </div>
)

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser


export default compose(
    withRouter,
    withAuthorisation(condition), 
    connect(mapStateToProps),
    withFirebase
)(AdminMatchesBox);
