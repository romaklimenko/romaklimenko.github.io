import React from "react"

const PetProject = () => {
  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#002b36" }}>
            <a href="/sun">
              <h1>Sun</h1>
              <p>Sunrise, sunset and length of the day.</p>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#D50000" }}>
            <a href="/cheat">
              <h1>Letterpress</h1>
              <p>A helper for the Letterpress game.</p>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#2962FF" }}>
            <a href="/yolo">
              <h1>Timeline</h1>
              <p>My life visualized on a timeline.</p>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default PetProject