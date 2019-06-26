import React, { Component } from 'react'
import { withFirebase } from './Firebase'

import '../scss/Globals.scss'
import '../scss/Team.scss'

class Team extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading:false,
            indexPrev: 0,
            index: 1,
            indexNext: 2,
            players: [],
        }

        this.handlePlayerChangeNext = this.handlePlayerChangeNext.bind(this);
        this.handlePlayerChangePrev = this.handlePlayerChangePrev.bind(this);
    }

    componentDidMount() {
        let newPlayers = [];
        let newPlayersID = [];
        // log the data from firestore
        this.setState({ loading:true  });

        this.props.firebase.players().get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                newPlayers = newPlayers.concat(doc.data());
                newPlayersID = newPlayersID.concat(doc.id);
                this.setState({ 
                    players: newPlayers, 
                    newPlayersID: newPlayersID,
                    loading: false
                });
            });
        })
    }

    handlePlayerChangeNext() {
        let {indexPrev, index, indexNext} = this.state;

        if(this.state.index === this.state.players.length-2) { // second from the end
            this.setState({ 
                indexPrev: indexPrev+1,
                index:index+1,
                indexNext:0  
            });
        } else if (this.state.index === this.state.players.length-1) { // last
            this.setState({ 
                indexPrev: indexPrev+1,
                index:0,
                indexNext:1  
            });
        } else if (this.state.index === 0) {
            this.setState({ 
                indexPrev:0,
                index: index+1,
                indexNext: indexNext+1  
            });
        } else {
            this.setState({ 
                indexPrev:indexPrev +1,
                index: index+1,
                indexNext: indexNext+1  
            });
        }

        this.animatePlayerChange();
    }

    handlePlayerChangePrev() {
        let {indexPrev, index, indexNext} = this.state;

        if(this.state.index === 1) { // second from the start
            this.setState({ 
                indexPrev: this.state.players.length-1,
                index:index-1,
                indexNext:indexNext-1  
            });
        } else if (this.state.index === this.state.players.length-1) { // last
            this.setState({ 
                indexPrev: indexPrev-1,
                index:index-1,
                indexNext:this.state.players.length-1  
            });
        } else if (this.state.index === 0) { // first
            this.setState({ 
                indexPrev:indexPrev-1,
                index:this.state.players.length-1,
                indexNext: 0  
            }); 
        } else {  
            this.setState({ 
                indexPrev:indexPrev -1,
                index: index-1,
                indexNext: indexNext-1  
            });
        }
    }

    animatePlayerChange() {
        let playerImages = document.getElementById('player-1');
        let playerImages2 = document.getElementById('player-2');
        let playerImages3 = document.getElementById('player-3');

        console.log(playerImages)

        playerImages.classList.add('flash');
        playerImages2.classList.add('flash');
        playerImages3.classList.add('flash');

        setTimeout(() => {
            playerImages.classList.remove('flash');
            playerImages2.classList.remove('flash');
            playerImages3.classList.remove('flash');
        }, 500);
    }

    render() {
        if(!this.state.loading && this.state.players.length > 3) {
            let {indexPrev, index, indexNext} = this.state;
            let curYear = new Date().getFullYear();
            let playerAge = curYear - this.state.players[index].age;

            return (
                <div className='team container-fluid wrapper'>
                    <h1 className='section-title'>Nasz Zespół</h1>
                    <div className='row carousel'>
                        <div className='content'>
                            <div className='content-secondary'>
                                <img id='player-1' className='player-image' src={this.state.players[indexPrev].imgURL} alt='Zawodnik.png' /> 
                                <img id='player-2' className='player-image' src={this.state.players[indexNext].imgURL} alt='Zawodnik.png' />
                            </div>
                            <div className='content-primary'>
                                <div className='content-image__main'>
                                    <img id='player-3' className='player-image' src={this.state.players[index].imgURL} alt='Zawodnik.png' />
                                </div>
                            </div>
                            <div className='content-text'>
                                    <p className='player-name'>{this.state.players[index].name}</p>
                                    <p className='player-position'>Pozycja: {this.state.players[index].position}</p>
                                    <p className='player-age'>Wiek: {playerAge}</p>
                                    <p className='player-description'>{this.state.players[index].desc}</p>
                            </div>
                        </div>
                                                {/* Navigation */}
                        <div className='team-nav row'>
                            <button className='col-lg-3 col-md-6 col-sm-6 arr arrleft' onClick={() => this.handlePlayerChangePrev()}><i class="fas fa-arrow-left"></i></button>
                            <button className='col-lg-3 col-md-6 col-sm-6 arr arrright' onClick={() => this.handlePlayerChangeNext()}><i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            
            )
        } else {
            return (
                <div><p>Loading...</p></div>
            )
        }
    }
}


export default withFirebase(Team);