// Carousel.js
import React from 'react';
import Slider from 'react-slick';



const Carousel = ({ possibleShows }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
      <h2>Possible Shows You Might Like</h2>
      <Slider {...settings}>
        {possibleShows.map((show) => (
          <div key={show.id} className="carousel-item">
            <img src={show.image} alt={show.title} />
            <div className="carousel-title">{show.title}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
