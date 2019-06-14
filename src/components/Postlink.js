import React, { Component } from 'react'
import { withFirebase } from './Firebase'
import { Link } from 'react-router-dom'
import '../scss/Post.scss'

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
        const ref = this.props.firebase.posts().doc(this.props.match.params.id);
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
            <div className='container postlink'>
                <div className='row'>
                        <div className='left-col col-lg-6'>
                            <h1 className='postlink-title'>{this.state.post.title}</h1>
                            <p className='postlink-text'>{this.state.post.text}</p>
                            <div className='postlink-footer'>
                                <Link to='/'>Wróć</Link>
                            </div>
                        </div>
                        <div className='right-col col-lg-6 '>
                            <img src={this.state.post.imgURL} alt='Post.jpg'/>
                        </div>
                </div>
            
            </div>
        )
    }
}


export default withFirebase(Postlink);