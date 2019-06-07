import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../scss/Post.scss'

export default class Post extends Component {

    
    render() {
        return (
            <div className='post col-lg-5 col-md-5 col-sm-12 mx-3 mb-5'>
                <div className='row'>
                    <div className="post-image col-lg-7">
                        <img src={this.props.img} alt='Post.jpg'/>
                    </div>
                    <div className='post-content col-lg-5'>
                        <h1 className='post-title'>{this.props.title}</h1>
                        <p className='post-desc'>{this.props.text}</p>
                        <div className='post-footer'>
                            <div className='post-author'>
                                <p>Autor: {this.props.author}</p>
                            </div>
                            <Link className='post-readmore__btn' to={`/posts/${this.props.id}`}>Czytaj Więcej</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
