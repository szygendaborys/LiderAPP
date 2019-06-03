import React from "react";
import { Carousel } from "react-responsive-carousel";
import '../scss/Slider.scss';

export default () => (
  <Carousel className='slider' autoPlay showThumbs={false} showStatus={false} showArrows infiniteLoop centerMode>
    <div>
      <img src="https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/5fmMjh.jpg?alt=media&token=34f20506-9b5b-439c-8a20-422f80a38511" alt='Carousel.jpg'/>
    </div>
    <div>
      <img src="https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/6t1NBi.jpg?alt=media&token=55632991-fe75-47a0-bc47-e300fe1bfb40" alt='Carousel.jpg' />
    </div>
    <div>
      <img src="https://firebasestorage.googleapis.com/v0/b/lider-swarzedz.appspot.com/o/940FP7.jpg?alt=media&token=1911fe5c-a231-43f2-8bad-3439af16cfd0" alt='Carousel.jpg' />
    </div>
  </Carousel>
);
