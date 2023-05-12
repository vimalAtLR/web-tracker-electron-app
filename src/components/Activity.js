import React from 'react'

function Activity(props) {
  return (
    <div>
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
            <p>Key pressed : {props.activity.keyPressed}</p>
            <p>Mouse moved : {props.activity.mouseMove}</p>
            <p>Mouse clicked : {props.activity.mouseClick}</p>
            <p>Mouse dragged : {props.activity.mouseDrag}</p>
            <p>Mouse scrolled : {props.activity.mouseScroll}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
