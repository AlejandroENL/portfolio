import React from "react";


type PageTile = {
  title: string
}

const aboutPage = ({title}:PageTile) => {
  return (
      <div className='aboutContainer'  >
        <h1 className="aboutTitle">Alejandro Morales </h1>
        <div className="card">
          <h2 className="aboutCard">
            Jorge 'Alejandro' Morales, was born in San Nicolás de los Garza. 
            He graduated from Texas State University in San Marcos with both a Bachelors or Arts in Anthropology and a Bachelors of Science in GIS. Alejandro has since moved back to North Texas and worked for both public and private organizations to improve their Geospatial tech. 
            Finally he launched his own start up, Every New Leaf, as a way to continue his ambition to learn and push the boundaries of his creativity and curiosity with technology. 
            Alejandro currently serves as a developer with the City of Dallas.
          </h2>
        </div>
        <p className="read-the-docs">
        </p>
      </div>
  );
};

export default aboutPage;

