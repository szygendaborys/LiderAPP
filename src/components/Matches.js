import React, { Component } from 'react'

import '../scss/Globals.scss'
import '../scss/Matches.scss'

class Matches extends Component {
    render() {
        const url = 'https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/cover.jpg?alt=media&token=254db1d9-f94b-402c-983e-3d35b70e7da1';
        
        return (
            <div className='matches wrapper'>
                    <h1 className='section-title'>Mecze</h1>
                    <div className='work-in-progress'>
                        <p>COMING SOON</p>
                        <img src={url} alt='background' />
                    </div>

            </div>
        )
    }
}

export default Matches;