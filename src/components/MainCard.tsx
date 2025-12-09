import AboutPage from "./AboutPage";
import TimeLine from "./TimeLine";



type MainCardParams = {
    title: string;
}


const MainCard = ({ title }: MainCardParams) => {
  return (
      (title === "about") ? (
        <div>
          <AboutPage/>
        </div>
        ) : (title === "timeline") ? (
        <div className='mainCard'>
          <TimeLine/>
          <div className="card"></div>
        </div> ) : (  
        <>

        <h1 className="nabla-header">
        Studied people, mapped places — now I engineer what connects them.
        </h1>
        </>
        ) 
      );
};

export default MainCard;

