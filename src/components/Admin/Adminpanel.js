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
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            posts:[]
        }
    }
    componentDidMount() {
        this.setState({ loading: true });
        console.log(this.props.firebase)
    //     this.props.firebase.posts().on('value', snapshot => {
    //     const postsObject = snapshot.val();

    //     const postsList = Object.keys(postsObject).map(key => ({
    //     ...postsObject[key],
    //     pid: key,
    //   }));

    //   this.setState({
    //     posts: postsList,
    //     loading: false,
    //   });
     //   });
    }


    //   componentWillUnmount() {
    //     this.props.firebase.posts().off();
    //   }

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