import React, { Component } from 'react'
import { withFirebase } from './Firebase'
import Post from './Post'

class Posts extends Component {
    
    render() {
        return (
            <div>
                <h2>Here I am a List of Posts!</h2>
                
            </div>
        )
    }
}

export default withFirebase(Posts);