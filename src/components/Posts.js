import React, { Component } from 'react'
import { withFirebase } from './Firebase'

import Post from './Post'
import SeeMoreBtn from './SeeMoreBtn'

import '../scss/Post.scss'

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            posts:[],
            post_id:[],
            lastVisible:null,
            limit:4,
            totalLimit:4
        }

        this.handlePageNext = this.handlePageNext.bind(this);
    }
    componentDidMount() {
        let newPosts=[];
        let postsId=[];

        this.setState({ loading: true });

        this.props.firebase.posts()
        .orderBy('date', 'desc')
        .limit(this.state.totalLimit)
        .get().then(querySnapshot => {
            let lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            this.setState({ lastVisible: lastVisible});
            querySnapshot.forEach(doc => {
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

    handlePageNext() {
        let newPosts=[];
        let postsId=[];

        this.setState({ loading: true });

        this.props.firebase.posts()
        .orderBy('date', 'desc')
        .limit(this.state.totalLimit + this.state.limit)
        .get().then(querySnapshot => {
            let lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];

            this.setState({ 
                lastVisible:lastVisible, 
                totalLimit:this.state.totalLimit + this.state.limit 
            });
            
            querySnapshot.forEach(doc => {
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
                            imgURL={post.imgURL}/>
                    ))}

                    <div className='col-lg-12 col-md-6 col-sm-12 seemore-wrapper'>
                        {this.state.loading && <p className='seemore-btn'>Loading...</p>}
                        {!this.state.loading && <SeeMoreBtn handlePageNext={() => this.handlePageNext()} />}
                    </div>
                </div>

            </div>
        )
    }
}

export default withFirebase(Posts);