
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import sanNicolas from '/san-nicolas.jpg';
import cdJuarez from '/cd-juarez.jpg';
import dallas from '/Dallas.jpg';
import txst from '/TXST.jpg';

const fadeImages = [
  { key: 1, url: sanNicolas, caption: 'First Slide' },
  { key: 2, url: cdJuarez, caption: 'Second Slide' },
  { key: 3, url: dallas, caption: 'Third Slide' },
  { key: 4, url: txst, caption: 'Fourth Slide' },
];



const Slideshow = () => {
  return (
    <div className="slideshow-bg">
      <Fade duration={3000} transitionDuration={1000} autoplay={true} infinite={true} arrows={false}>
        {fadeImages.map((fadeImage) => (
          <div key={fadeImage.key}>
            <img
              style={{ width: '100%', height: '100%' }}
              src={fadeImage.url}
              alt={fadeImage.caption}
            />
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;