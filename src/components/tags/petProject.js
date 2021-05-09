import React from "react"

const PetProject = () => {
  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4">
          <a href="/sun" class="a-jumbotron">
            <div className="jumbotron" style={{ backgroundColor: "#002b36" }}>
              <h1>Sun</h1>
              <p>Sunrise, sunset and length of the day.</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/cheat" class="a-jumbotron">
            <div className="jumbotron" style={{ backgroundColor: "#D50000" }}>
              <h1>Letterpress</h1>
              <p>A helper for the Letterpress game.</p>
            </div>
          </a>
        </div>
        <div className="col-md-4">
          <a href="/yolo" class="a-jumbotron">
            <div className="jumbotron" style={{ backgroundColor: "#2962FF" }}>
              <h1>Timeline</h1>
              <p>My life visualized on a timeline.</p>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default PetProject