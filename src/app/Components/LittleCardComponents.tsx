import React from "react";

const LittleCardComponents = (props: {
  numberOfWeek: string;
  background: string
  nameOfWeek: string;
  image: string;
  upArrowPicture: string;
  downArrowPicture: string
  HighNumber: string;
  LowNumber: string;
}) => {
  return (
    <div>
      <div className="container">
        <div className={props.background}>
          <div>
            <h1>
              {props.nameOfWeek}
              {props.numberOfWeek}
            </h1>
          </div>

          <div><img className="" src={props.image} alt="Weather icon"/></div>
          <div><img className="" src={props.upArrowPicture} alt="Up Arrow Picture"/><h1>{props.HighNumber}</h1></div>
          <div><img className="" src={props.downArrowPicture} alt="Down Arrow Picture"/><h1>{props.LowNumber}</h1></div>
        </div>
      </div>
    </div>
  );
};

export default LittleCardComponents;
