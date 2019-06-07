import React, { Component } from 'react'
import { withFirebase } from './Firebase'
import Post from './Post'

import '../scss/Post.scss'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            posts:[],
            post_id:[]
        }
    }
    componentDidMount() {
        let newPosts=[];
        let postsId=[];

        this.setState({ loading: true });

        this.props.firebase.posts().get().then(querySnapshot => {
            querySnapshot.forEach((doc, i) => {
                newPosts = newPosts.concat(doc.data());
                postsId = postsId.concat(doc.id);           
                this.setState({
                    posts:newPosts,
                    post_id:postsId,
                    loading:false
                });
            })
        })

        
        
        
    }

    render() {
        return (
            <div className='posts'>
                <div className='row'>
                    {this.state.posts.map((post, i) => (
                        <Post 
                            key={i}
                            title={post.title}
                            author={post.author}
                            desc={post.desc}
                            text={post.text}
                            id={this.state.post_id[i]}
                            date={post.date}
                            img={post.img}/>
                    ))}

                    {this.state.loading && <p>Loading...</p>}
                </div>
            </div>
        )
    }
}

export default withFirebase(Posts);