import { withFirebase } from '../Firebase'
import React, { Component } from 'react'

import Post from '../Post'
import '../../scss/Admin.scss'

class AdminPostMng extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading:false,
            posts:[],
            modal:{
                author:'',
                date:'',
                title:'',
                desc:'',
                img:'',
                text:''
            }
        }
    }

componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.posts().get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            this.setState({ 
                posts:this.state.posts.concat(doc.data()),
                loading:false
            });
        })
    }) 

}

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    {this.state.posts.map(post => (
                        <div className='adm-post col-lg-12 center' >
                            <div className='adm-post__mng ml-3'>
                                <button className='btn-edit'><i class="far fa-edit"></i></button>
                                <button className='btn-delete'><i class="far fa-trash-alt"></i></button>
                            </div>
                            <Post 
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            desc={post.desc}
                            text={post.text}
                            id={post.pid}
                            date={post.date}
                            img={post.img}/>
                        </div>
                    ))}

                    {this.state.loading && <p>Loading...</p>}
                </div>

                <button className='btn-addpost'><span>+</span></button>
            </div>
        )
    }
}

export default withFirebase(AdminPostMng);