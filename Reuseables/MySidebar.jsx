import { useState } from "react";

const MySidebar = ({ children }) => {
  const [width, setWidth] = useState(0);

  return (
    <>
      <div
        id="mySidepanel"
        className="sidepanel"
        style={{ width: width }}
        onClick={() => {
          setWidth(0);
        }}
      >
        <button className="closebtn">&times;</button>
        <p>{children}</p>
      </div>
      <button
        className="openbtn"
        onClick={() => {
          setWidth(250);
        }}
      >
        &#9776; Toggle Sidepanel
      </button>
    </>
  );
};

export default MySidebar;
