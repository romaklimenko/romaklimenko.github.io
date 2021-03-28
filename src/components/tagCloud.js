import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default function TagCloud() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
          }
        }
      `}
      render={data => {
        const sum = data.allMarkdownRemark.group
          .map(d => d.totalCount)
          .reduce((a, b) => a + b, 0)
        return data.allMarkdownRemark.group.map(d => {
          const fontSize = Math.floor((d.totalCount / sum + 1) * 100)
          return (
            <span key={d.fieldValue}>
              <Link
                to={`/tags/${d.fieldValue}`}
                itemProp="url"
                style={{
                  paddingRight: "5px",
                  whiteSpace: "nowrap",
                  fontSize: `${fontSize}%`,
                }}
              >
                {d.fieldValue}
              </Link>{" "}
            </span>
          )
        })
      }}
    />
  )
}
