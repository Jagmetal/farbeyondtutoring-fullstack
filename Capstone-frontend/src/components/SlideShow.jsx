import React, { useEffect, useState } from 'react';
import '../styles/Slideshow.css';

const SlideShow = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [currentImage]);

  return (
    <div className="slideshow-container">
      {images.map((src, index) => (
        <div key={index} className={`slide ${index === currentImage ? 'active' : ''}`}>
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}


      {/*<a className="prev" onClick={prevImage}>&#10094;</a>
      <a className="next" onClick={nextImage}>&#10095;</a>*/}
    </div>
  );
};

export default SlideShow;
