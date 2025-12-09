import aboutImage from '/IMG_5589.jpg'


const aboutPage = () => {
  return (
      <div className='aboutContainer'  >
        <h1 className="aboutTitle">Alejandro Morales </h1>
        <div className="card">
          <h2 className="aboutCard">
            Jorge “Alejandro” Morales is a Software Engineer with a background in Anthropology and GIS — because why choose one discipline when you can confuse everyone and do three? 
            <br/>
            <br/>

            A Texas State graduate, he has worked across public and private sectors improving geospatial systems and scaling modern applications. 
            Driven by curiosity, he founded Every New Leaf as a space to explore ideas, build tools, and push creative boundaries. 
            Today, he continues shaping technology with purpose and forward momentum. And yes — Anthropology still calls. He’ll circle back eventually. It’s what you do with maps, after all.
          </h2>
        </div>
            <div className='aboutImageAnimate'>
              <img className="aboutImage" src={aboutImage} alt={"about image"}/>
            </div>

      </div>
      
  );
};

export default aboutPage;

