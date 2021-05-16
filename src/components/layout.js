import * as React from "react"
import { Link } from "gatsby"
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "../utils/AppInsights";

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="container" data-is-root-path={isRootPath}>
      <header>
        <span style={{ backgroundColor: "#007BFF" }}>
          <a href="/">Roman Klimenko</a>
        </span>
        <span style={{ backgroundColor: "#D50000" }}>
          <a href="/blog">Blog</a>
        </span>
      </header>
      {children}
    </div>
  )
}

export default withAITracking(reactPlugin, Layout);
