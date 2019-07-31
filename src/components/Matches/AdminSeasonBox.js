// tu bedzie season box pokazujacy sezony 2019/29 np. po kliknieciu bedzie redirect do 
// MatchesBoxa a w propsach przeniesiony bedzie numer sezonu -> rok rozpoczecia = rok sezonu 

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SeasonBox extends Component {

    render() {
        return (
            <Link className='seasonbox' to={`/adminseason/${this.props.season}`}>
                <p className='seasonbox__season'>{this.props.season}/{this.props.season+1}</p>
            </Link>
        )
    }
}

export default SeasonBox;