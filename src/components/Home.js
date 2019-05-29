import React, { Component } from 'react'
import { withFirebase } from './Firebase'
import { connect } from 'react-redux';

import { compose } from 'recompose';

import Posts from './Posts'

class Home extends Component {
componentDidMount() {
    console.log(this.props.firebase)
}

render() {    
        return (
            <div>
                <h1>THIS IS HOME PAGE</h1>
                <button>ADD</button>
                <h5>Here: {this.props.num}</h5>

                <h5>You'll find below all of posts</h5>

                <Posts />

            </div>
        )
    }
   
}

const mapStateToProps = state => ({
    num:state.sessionState.num
  });

  export default compose(withFirebase, connect(mapStateToProps))(Home);