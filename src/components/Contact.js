import React from 'react'

import '../scss/Globals.scss'
import '../scss/Contact.scss'

const Contact = () => (
            <div className='contact wrapper'>
                <h1 className='section-title'>Kontakt</h1>
                <div className='contact-content'>

                    <div className='contact-box'>
                        <i className="fas fa-phone"></i>
                        <p>(+48) 123 456 789</p>
                    </div>

                    <div className='contact-box'>
                        <i className="far fa-envelope"></i>
                        <p className='contact-box__mail'>szygenda.borys@gmail.com</p>
                    </div>

                    <div className='contact-box'>
                        <i className="fas fa-map-marker-alt"></i>
                        <p>ul. Swarzędzka 123 <br/> 62-020, Swarzędz</p>
                    </div>

                </div>
            </div>
)

export default Contact;