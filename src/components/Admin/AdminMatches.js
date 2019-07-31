import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

import Loading from '../Loading'
import SeasonBox from '../Matches/AdminSeasonBox'

import '../../scss/Globals.scss'
import '../../scss/AdminMatches.scss'
class AdminMatches extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading:false,
            seasons:[],
            matches:[],
            doc_id:null
        }

    }

componentDidMount() {
    let newSeasons=[];

    this.setState({ loading: true });

    this.props.firebase.matches()
        .get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                newSeasons = newSeasons.concat(doc.data());        
                this.setState({
                    seasons:newSeasons,
                    doc_id:doc.id,
                    loading:false
                });
            })
        })
}

checkState() {
    // console.log(this.state.seasons[0].seasons[0]) OUTPUT: 2019
    let matches = [];

    matches = this.state.seasons[0].seasons.map((season, i) => matches.concat(season));

    console.log(matches)
}

    render() {
        if(this.state.seasons.length > 0) {

            let seasons = this.state.seasons[0].seasons;

            return (
                <div className='container-fluid admin-matches'>
                    <p className='section-title'>Wybierz sezon:</p>

                    <div className='seasonbox__container'>
                        {
                            seasons.map((season, i) => (
                                <div className='adm-post__mng'>
                                    <button className='btn-delete'><i className="far fa-trash-alt"></i></button>
                                    <SeasonBox key={i} season={season}/>
                                </div>
                            ))
                        }
                    </div>

                    <button onClick={() => this.checkState()}>SPRAWDZ</button>
                </div>
            )
        } else {
            return (
                <div className='container-fluid admin-matches'>
                    <p className='section-title'>Wybierz sezon:</p>
                    <Loading />
                </div>
            )
        }

       
    }
}

export default withFirebase(AdminMatches);