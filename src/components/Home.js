import React, { Component } from 'react'
import { withFirebase } from './Firebase'
import { connect } from 'react-redux';
import { compose } from 'recompose';

import '../scss/Home.scss'
import '../scss/Globals.scss'

import Posts from './Posts'

class Home extends Component {

render() {    
        return (
            <div className="container-fluid home wrapper"> 
                <h1 className='section-title'>Co u nas?</h1>
                
                <Posts />

            </div>
        )
    }
   
}

const mapStateToProps = state => ({
    num:state.sessionState.num
  });

  export default compose(withFirebase, connect(mapStateToProps))(Home);