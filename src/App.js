import React, { useEffect, useState } from "react";
const { ipcRenderer } = window.require("electron");
import "./App.css";

function App() {
  const [ activity, setActivity ] = useState({
    mouseMove: 0,
    mouseClick: 0,
    mouseDrag: 0,
    mouseScroll: 0,
    keyPressed: 0,
  });

  useEffect(() => {
    const getActivity = setInterval(() => {
      ipcRenderer.send(
        "give-me-activity-update",
        "Hello bro give me new activity data"
      );
    }, 10000); // 10 minutes = 600000

    ipcRenderer.on("ok-take-it", (event, args) => {
      setActivity(args);
      console.log(args);
    });

    return () => {
      clearInterval(getActivity);
    };
  },[]);

  return (
    <>
      <div className="center">
        <div className="property-card">
          <a href="#">
            <div className="property-image">
              <div className="property-image-title">
                {/* <!-- Optional <h5>Card Title</h5> If you want it, turn on the CSS also. --> */}
              </div>
            </div>
          </a>
          <div className="property-description">
            <h5> Activity </h5>
            <p>Key pressed : {activity.keyPressed}</p>
            <p>Mouse moved : {activity.mouseMove}</p>
            <p>Mouse clicked : {activity.mouseClick}</p>
            <p>Mouse dragged : {activity.mouseDrag}</p>
            <p>Mouse scrolled : {activity.mouseScroll}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
