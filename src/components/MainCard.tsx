import React from "react";
import AboutPage from "./AboutPage";
import TimeLine from "./TimeLine";


type MainCardParams = {
    title: string;
}


const MainCard = ({ title }: MainCardParams) => {
    console.log({title})
  return (
      (title === "about") ?
        <div>
          <AboutPage title={title}/>
        </div> : (title === "timeline") ?
        <div className='mainCard'>
          <TimeLine title={title}/>
          <div className="card"></div>
        </div> : 
        <div>
          Home
        </div>

  );
};

export default MainCard;

