import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../scss/Post.scss'

export default class Post extends Component {

    
    render() {
        return (
            <div className='post col-lg-5 col-md-5 col-sm-12 mx-3 mb-5'>
                <div className='row'>
                    <div className="post-image col-lg-7">
                        <img src={this.props.imgURL} alt='Post.jpg'/>
                    </div>
                    <div className='post-content col-lg-5'>
                        <h1 className='post-title'>{this.props.title}</h1>
                        <p className='post-desc'>{this.props.desc}</p>
                        <div className='post-footer'>
                            <Link className='post-readmore__btn text-center' to={`/posts/${this.props.id}`}>Czytaj Więcej</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
