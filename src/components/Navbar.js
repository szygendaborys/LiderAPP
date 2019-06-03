import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../constants/routes'

import '../scss/Navbar.scss'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Carousel from './Carousel'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuToggle:false,
            activeLink:'link-home',
            activeLinkMobile:'link-home__mobile'
        }

        this.menuToggle = this.menuToggle.bind(this);   
    }

    menuToggle() {
        const cover = document.getElementById('cover');
        const menu = document.getElementById('mobile-menu');
        const body = document.body;
        
        if(this.state.menuToggle) {
            this.setState({ menuToggle:false  });
            menu.style.display = 'none';
            cover.style.display = 'none';
            body.classList.remove('stop-scrolling');
        } else {
            this.setState({ menuToggle:true  });
            menu.style.display = 'block';
            cover.style.display = 'block';
            body.classList.add('stop-scrolling');
        }
    }

    linkToggle(e) {
        const prevId = this.state.activeLink;
        const curId = e.target.id;
    
        this.setState({ activeLink: curId });

        if(prevId!==curId) {
            const prevLink = document.getElementById(prevId);
            const curLink = document.getElementById(curId);

            prevLink.classList.remove('link__active');
            curLink.classList.add('link__active');
        }

    }

    linkToggleMobile(e) {
        this.menuToggle();
        
        const prevId = this.state.activeLinkMobile;
        const curId = e.target.id;
        
        // console.log('prev Target = '+prevId);
        // console.log('curTarget= '+curId);

        this.setState({ activeLinkMobile: curId });
        if(prevId!==curId) {
            const prevLink = document.getElementById(prevId);
            const curLink = document.getElementById(curId);

            prevLink.classList.remove('link__active');
            curLink.classList.add('link__active');
        }
    }


    render() {
        return (
            <div>
                <div className='navibar'>
                    <ul className='navibar-web'>
                        <li>
                            <Link to={ROUTES.HOME} id='home' onClick={e => this.linkToggle(e)}><p className='link link__active' id='link-home'>Home</p></Link>
                        </li>
                        <li>
                            <Link to={ROUTES.TEAM} id='team' onClick={e => this.linkToggle(e)}><p className='link' id='link-team'>Drużyna</p></Link>
                        </li>
                        <li>
                            <Link to={ROUTES.TRAININGS} id='trainings' onClick={e => this.linkToggle(e)}><p className='link' id='link-trainings'>Treningi</p></Link>
                        </li>
                        <li>
                            <Link to={ROUTES.SIGNINPAGE} id='signin' onClick={e => this.linkToggle(e)}><p className='link' id='link-signin'>Zaloguj</p></Link>
                        </li>
                        <li>
                            <Link to={ROUTES.ADMINPANEL} id='admin' onClick={e => this.linkToggle(e)}><p className='link' id='link-admin'>Admin</p></Link>
                        </li>
                    </ul>
                    <div className='navibar-mobile' id='navbar-mobile'>
                        <div className='cover' id='cover' onClick={this.menuToggle}> </div>
                        <div className='burger' onClick={this.menuToggle} id='burger'><i className="fas fa-bars"></i></div>
                        <div className='mobile-menu' id='mobile-menu'>
                            
                            <div className='mobile-header'>
                                <img 
                                src='https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/logo.png?alt=media&token=ec448096-b17e-4cad-9901-760a6943eb40' 
                                alt='Logo.png' />
                                <i className="fas fa-angle-right burger__close" onClick={this.menuToggle} id='burger-close'></i>
                            </div>
                            <ul className='mobile-links'>
                                <li>
                                    <Link to={ROUTES.HOME} onClick={e => this.linkToggleMobile(e)}><p className='link-mobile link__active' id='link-home__mobile'>Home</p></Link>
                                </li>
                                <li>
                                    <Link to={ROUTES.TEAM} onClick={e => this.linkToggleMobile(e)}><p className='link-mobile' id='link-team__mobile'>Drużyna</p></Link>
                                </li>
                                <li>
                                    <Link to={ROUTES.TRAININGS} onClick={e => this.linkToggleMobile(e)}><p className='link-mobile' id='link-trainings__mobile'>Treningi</p></Link>
                                </li>
                                <li>
                                    <Link to={ROUTES.SIGNINPAGE} onClick={e => this.linkToggleMobile(e)}><p className='link-mobile' id='link-signin__mobile'>Zaloguj</p></Link>
                                </li>
                                <li>
                                    <Link to={ROUTES.ADMINPANEL} onClick={e => this.linkToggleMobile(e)}><p className='link-mobile' id='link-admin__mobile'>Admin</p></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <Carousel />
            </div>
        )
    }
}

export default Navbar;