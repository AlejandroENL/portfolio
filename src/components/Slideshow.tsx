import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
    url: '/san-nicolas.jpg',
    caption: 'First Slide'
  },
  {
    url: '/cd-juarez.jpg',
    caption: 'Second Slide'
  },
    {
    url: '/Dallas.jpg',
    caption: 'Third Slide'
  },
  {
    url: '/TXST.jpg',
    caption: 'Fourth Slide'
  },
];



const Slideshow: React.FC = () => {
  return (
    <div className="slideshow-bg">
      <Fade duration={3000} transitionDuration={1000} autoplay={true} infinite={true} arrows={false}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%', height: '100%'}} src={fadeImage.url} />
          </div>
          
        ))}
      </Fade>
    </div>
  )
};

export default Slideshow;