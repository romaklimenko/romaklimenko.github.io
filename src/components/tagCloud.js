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
        const biggestTagCount = Math.max(...data.allMarkdownRemark.group.map(d => d.totalCount));
        const minFontSize = 100;
        const maxFontSize = 150;

        const count = data.allMarkdownRemark.group
          .map(d => d.totalCount)
          .reduce((a, b) => a + b, 0);

        return data.allMarkdownRemark.group.map(d => {
          const fontSize = d.totalCount === 1 ? 95 : Math.floor(d.totalCount / biggestTagCount * (maxFontSize - minFontSize)) + minFontSize;
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
