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
    imgData: "",
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
          <img src={`${activity.imgData}`} alt="" />
          <div className="property-description">
            <h5> Activity </h5>
            <p>Key pressed : {activity.keyPressed}</p>
            <p>Mouse moved : {activity.mouseMove}</p>
            <p>Mouse clicked : {activity.mouseClick}</p>
            <p>Mouse dragged : {activity.mouseDrag}</p>
            <p>Mouse scrolled : {activity.mouseScroll}</p>
            <p>Window title : {activity.windowTitle}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
