import React, { Component } from 'react'
import { withFirebase } from './Firebase'


class Postlink extends Component {
    constructor(props){
        super(props);
        this.state= {
            post:[],
            key:'',
            loading:false
        }
    }

    componentDidMount() {
        this.setState({ loading:true  });
        const ref = this.props.firebase.posts.doc(this.props.match.params.id);
        ref.get().then((doc) => {
        if (doc.exists) {
            this.setState({
                post: doc.data(),
                key: doc.id,
                loading: false
            });
        } else {
            alert("No such document!");
            }
        });
    }

    render() {
        return (
            <div className='postlink'>
                <h1>Here I am, a full Post!</h1>
            </div>
        )
    }
}


export default withFirebase(Postlink);