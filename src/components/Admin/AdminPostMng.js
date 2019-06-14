import { withFirebase } from '../Firebase'
import React, { Component } from 'react'

import Post from '../Post'
import '../../scss/Admin.scss'
import AdminPostModal from './AdminPostModal';

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
            }
        }

        this.newPost = this.newPost.bind(this);
        this.onUploadImage = this.onUploadImage.bind(this);
    }

componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.posts().get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.setState({ 
                posts:this.state.posts.concat(doc.data()),
                post_id:this.state.post_id.concat(doc.id),
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

handlePostDelete(id) {
    //look for javascript confirm() method ! 
    
    this.props.firebase.posts().doc(id).delete()
    .then(document.location.reload());
    
    
}

// onClick={() => this.changePost(this.state.posts[i])} \|/

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.posts.map((post, i) => (
                        <div className='adm-post col-lg-12 center' key={this.state.post_id[i]} id={i}>
                            <div className='adm-post__mng ml-3'>
                                <button className='btn-edit' onClick={() => this.editPost(this.state.posts[i], this.state.post_id[i])}><i className="far fa-edit"></i></button>
                                <button className='btn-delete' onClick={() => this.handlePostDelete(this.state.post_id[i])}><i className="far fa-trash-alt"></i></button>
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

                    {this.state.loading && <p>Loading...</p>}


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