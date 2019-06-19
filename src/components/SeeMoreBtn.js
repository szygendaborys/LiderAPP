import React, { Component } from 'react'
import '../scss/Post.scss'

export default class SeeMoreBtn extends Component {
    render() {
        return (
            <div>
                <button className='btn seemore-btn' onClick={() => this.props.handlePageNext()}>Zobacz starsze posty</button>
            </div>
        )
    }
}