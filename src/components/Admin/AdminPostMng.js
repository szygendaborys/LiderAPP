import { withFirebase } from '../Firebase'
import React, { Component } from 'react'

import Post from '../Post'
import AdminPostModal from './AdminPostModal'
import SeeMoreBtn from '../SeeMoreBtn'
import Loading from '../Loading'

import '../../scss/Admin.scss'

class AdminPostMng extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading:false,
            posts:[],
            post_id:[],
            modal:{
                title:'sadasd',
                desc:'',
                imgURL:'',
                text:'',
                id:null
            },
            lastVisible:null,
            limit:3,
            totalLimit:4
        }

        this.newPost = this.newPost.bind(this);
        this.onUploadImage = this.onUploadImage.bind(this);
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

onUploadImage(imageURL) {
    let newModal = this.state.modal;
    console.log(imageURL);
    newModal.imgURL = imageURL;
    this.setState({ modal:newModal  });
}

newPost() {
    let empty = {
        title:'',
        desc:'',
        imgURL:'',
        text:'',
        id:null
    }
    this.setState({ modal:empty });

    this.openModal();
}

openModal() {
    const modal = document.getElementById('admin-modal__post');
    modal.classList.remove('hidden');
}

editPost(post, post_id) {
    if(post) {
        let newModal = {
            title:post.title,
            desc:post.desc,
            imgURL:post.imgURL,
            text:post.text,
            id:post_id
        }
        this.setState({ modal:newModal });
    }

    this.openModal();
}

handleChange(e) {
    let newModal = {...this.state.modal}
    newModal[e.target.name] = e.target.value;
    this.setState({ modal: newModal});
}

handlePostDelete(id, post) {
    //look for javascript confirm() method ! 

    this.props.firebase.posts().doc(id).delete().then(this.props.firebase.postimgRoot().refFromURL(post.imgURL).delete());
    
    this.componentDidMount();
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

        this.setState({ lastVisible:lastVisible, totalLimit:this.state.totalLimit + this.state.limit });
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
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.posts.map((post, i) => (
                        <div className='adm-post col-lg-12 center' key={this.state.post_id[i]} id={i}>
                            <div className='adm-post__mng ml-3'>
                                <button className='btn-edit' onClick={() => this.editPost(this.state.posts[i], this.state.post_id[i])}><i className="far fa-edit"></i></button>
                                <button className='btn-delete' onClick={() => this.handlePostDelete(this.state.post_id[i], this.state.posts[i])}><i className="far fa-trash-alt"></i></button>
                            </div>
                            <Post 
                            title={post.title}
                            author={post.author}
                            desc={post.desc}
                            text={post.text}
                            id={post.pid}
                            date={post.date}
                            imgURL={post.imgURL}/>
                        </div>
                    ))}

                    <div className='col-lg-12 col-md-6 col-sm-12 seemore-wrapper'>
                        {this.state.loading && <Loading />}
                        {!this.state.loading && <SeeMoreBtn handlePageNext={() => this.handlePageNext()} />}
                    </div>


                    <AdminPostModal 
                    post={this.state.modal} 
                    handleChange={e => this.handleChange(e)}
                    onUploadImage={url => this.onUploadImage(url)}/>
                </div>

                <button className='btn-addpost' onClick={() => this.newPost()}><span>+</span></button>
            </div>
        )
    }
}

export default withFirebase(AdminPostMng);