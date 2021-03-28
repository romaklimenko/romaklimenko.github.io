import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark

  const jumbotron = tag => {
    if (tag === "pet-project") {
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
  }

  return (
    <Layout location="tag" title={`Tag: ${tag}`}>
      <SEO title={tag} description={tag} />
      <div>
        {jumbotron(tag)}
        <h3>Tag: {tag}</h3>
        <ul className="list-unstyled">
          {edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <small>{node.frontmatter.date}</small>{" "}
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
        }
      }
    }
  }
`
