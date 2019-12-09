import React from "react";

export const DisplayRoom = props => {
  return (
    <>
      <div className="ui container  grid ">
        <div className="row ">
          <div className="column ">
            Click on the desiderable room to show the events:
            <ol className="">
              {props.roomEvents.map((item, i) => {
                let dateObj = new Date(item.time.seconds * 1000);
                let utcString = dateObj.toUTCString();
                let time = utcString.slice(0, 22);

                return (
                  <li className="styleList" key={i}>
                    {item.name} - {time}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
