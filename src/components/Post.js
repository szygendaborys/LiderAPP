import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../scss/Post.scss'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullDate: null
        }
    }
    getFullDate() {
        let postDate = this.props.date.toDate();
        let postDateDay = postDate.getDate();
        let postDateMonth = postDate.getMonth();
        let postDateYear = postDate.getFullYear();
        let postDateHour = postDate.getHours();
        let postDateMin = postDate.getMinutes();

        let postDateMonthString = this.determineMonth(postDateMonth);
        
        postDateMin = this.hasTwoDigits(postDateMin);
        postDateHour = this.hasTwoDigits(postDateHour);
        postDateDay = this.hasTwoDigits(postDateDay);

        let fullDate = `${postDateDay} ${postDateMonthString} ${postDateYear} ${postDateHour}:${postDateMin}`;
        this.setState({ fullDate: fullDate });
    }

    determineMonth(month) {
        switch(month) {
            case 0:
                return 'Sty';
            case 1:
                return 'Lut';
            case 2:
                return 'Mar';
            case 3:
                return 'Kwi';
            case 4:
                return 'Maj';
            case 5:
                return 'Cze';
            case 6:
                return 'Lip';
            case 7:
                return 'Sie';
            case 8:
                return 'Wrz';
            case 9:
                return 'Paź';
            case 10:
                return 'Lis';
            case 11:
                return 'Gru';
            default:
                return 'unknwn';
        }
    }

    hasTwoDigits(number) {
        if(number<10) {
            let newNumber = '0' + number;
            return newNumber;
        }
        return number;
    }

    componentDidMount() {
        this.getFullDate();
    }
    
    render() {
        return (
            <div className='post col-lg-5 col-md-5 col-sm-12 mx-3 mb-5'>
                <div className='row'>
                    <div className="post-image col-lg-7">
                        <img src={this.props.imgURL} alt='Post.jpg'/>
                    </div>
                    <div className='post-content col-lg-5'>
                        <h1 className='post-title'>{this.props.title}</h1>
                        <p className='post-desc'>{this.props.desc}</p>
                        <div className='post-footer'>
                            <p className='post-date'>{this.state.fullDate}</p>
                            <Link className='post-readmore__btn text-center' to={`/posts/${this.props.id}`}>Czytaj Więcej</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
