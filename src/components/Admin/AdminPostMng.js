import { withFirebase } from '../Firebase'
import React, { Component } from 'react'



class AdminPostMng extends Component {
    
componentDidMount() {
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

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default withFirebase(AdminPostMng);