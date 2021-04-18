import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagCloud from "../components/tagCloud"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <div className="row">
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#26a29a" }}>
            <a href="/tags/cluedin">
              <h2>CluedIn</h2>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#FF6D00" }}>
            <a href="/tags/dataisbeautiful">
              <h2>Data</h2>
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="jumbotron" style={{ backgroundColor: "#0277BD" }}>
            <a href="/tags/cloud">
              <h2>Cloud</h2>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h3>Tags</h3>
          <p>
            <TagCloud />
          </p>
          <h3>Posts</h3>
          <ol className="list-unstyled">
            {posts.map(post => {
              const title = post.frontmatter.title || post.fields.slug

              return (
                <li key={post.fields.slug}>
                  <small>{post.frontmatter.date}</small>&nbsp;
                  <Link to={post.fields.slug} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </li>
              )
            })}
            <li>
              <Link to="/blog">More posts &rarr;</Link>
            </li>
          </ol>
        </div>
        <div className="col-md-4">
          <h3>About</h3>
          <p>
            I am a professional software developer who have been in IT for more
            than two decades and spent more than eleven years in{" "}
            <Link to="/blog/2020/sitecorosaur/">Sitecore</Link>. From March
            2021, I am happy to be a Senior Implementation Engineer in{" "}
            <a href="https://www.cluedin.com/" target="_blank" rel="noreferrer">
              CluedIn
            </a>
            .
          </p>
          <h3>Contact</h3>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:romaklimenko@gmail.com">romaklimenko@gmail.com</a>
            </li>
            <li>+45 53 65 42 46</li>
            <li>Denmark, Copenhagen</li>
            <br />
            <li>
              LinkedIn:{" "}
              <a
                href="https://dk.linkedin.com/in/romaklimenko"
                rel="noreferrer"
              >
                Roman Klimenko
              </a>
            </li>
            <li>
              Facebook:{" "}
              <a
                href="https://www.facebook.com/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                Roman Klimenko
              </a>
            </li>
            <li>
              GitHub:{" "}
              <a
                href="https://github.com/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
            <li>
              Observable:{" "}
              <a
                href="https://observablehq.com/@romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
            <li>
              StackExchange:{" "}
              <a
                href="https://stackexchange.com/users/323269/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
            <li>
              Twitter:{" "}
              <a
                href="https://twitter.com/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
            <li>
              Instagram:{" "}
              <a
                href="https://www.instagram.com/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
            <li>
              Unsplash:{" "}
              <a
                href="https://unsplash.com/@romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                @romaklimenko
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Photo</h3>
          <img
            className="img-fluid"
            alt="random"
            src="https://source.unsplash.com/user/romaklimenko/"
          ></img>
          <br />
          <br />
          <dl>
            <dt>Microsoft:</dt>
            <dd>
              <a
                href="/downloads/F400-4733MCP.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Microsoft Certified Professional
              </a>
            </dd>
            <dd>
              <a
                href="/downloads/F400-4744MS.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Microsoft Specialist: Programming in HTML5 with JavaScript and
                CSS3
              </a>
            </dd>
            <dd>Exam 70-486: Developing ASP.NET MVC Web Applications</dd>
          </dl>

          <dl>
            <dt>MongoDB:</dt>
            <dd>
              <a href="/downloads/M101.pdf" target="_blank" rel="noreferrer">
                M101: MongoDB for Developers 2012
              </a>
            </dd>
            <dd>
              <a href="/downloads/M102.pdf" target="_blank" rel="noreferrer">
                M102: MongoDB for DBAs 2014
              </a>
            </dd>
            <dd>
              <a href="/downloads/M101N.pdf" target="_blank" rel="noreferrer">
                M101N: MongoDB for .NET Developers 2015
              </a>
            </dd>
            <dd>
              <a
                href="/downloads/M102-2015.pdf"
                target="_blank"
                rel="noreferrer"
              >
                M102: MongoDB for DBAs 2015
              </a>
            </dd>
          </dl>

          <dl>
            <dt>Sitecore:</dt>
            <dd>Sitecore Certified Professional Developer 6.5</dd>
            <dd>Sitecore Certified Professional Developer 8.0</dd>
            <dd>Sitecore Certified Technology Specialist</dd>
            <dd>Sitecore Certified Marketer</dd>
          </dl>
          <dl>
            <dt>Veracode:</dt>
            <dd>
              <a
                href="/downloads/ELearningLearnerLevelCert_Klimenko_Roman_3.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Verified Continuous Security Champion
              </a>
            </dd>
          </dl>

          <dl>
            <dt>Danish:</dt>
            <dd>
              Duolingo profile:{" "}
              <a
                href="https://www.duolingo.com/romaklimenko"
                target="_blank"
                rel="noreferrer"
              >
                duolingo.com/romaklimenko
              </a>
            </dd>
            <dd>
              Passed{" "}
              <a
                href="http://uim.dk/arbejdsomrader/danskundervisning-og-prover-for-udlaendinge/danskuddannelse/danskprover-1"
                target="_blank"
                rel="noreferrer"
              >
                Prøve i Dansk 3
              </a>{" "}
              in{" "}
              <a
                href="http://www.studieskolen.dk"
                target="_blank"
                rel="noreferrer"
              >
                Studieskolen
              </a>
              .
            </dd>
          </dl>
          <dl>
            <dt>Running:</dt>
            <dd>
              CPH Marathon 24.05.2015. 4:30:09 (
              <a
                href="http://live.ultimate.dk/desktop/front/index.php?eventid=2601&amp;amp;pid=7997"
                target="_blank"
                rel="noreferrer"
              >
                official
              </a>
              ), 4:27:29 (
              <a
                href="https://connect.garmin.com/modern/activity/783416816"
                target="_blank"
                rel="noreferrer"
              >
                GPS
              </a>
              )
            </dd>
          </dl>

          <dl>
            <dt>Johns Hopkins University on Coursera:</dt>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/records/7sTshpjWJAnBGbkW"
                target="_blank"
                rel="noreferrer"
              >
                The Data Scientist’s Toolbox
              </a>
            </dd>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/records/JBkQGEJPGEeYmvp3"
                target="_blank"
                rel="noreferrer"
              >
                R Programming
              </a>
            </dd>
          </dl>

          <dl>
            <dt>
              Software Product Management Specialization by University of
              Alberta on Coursera:
            </dt>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/certificate/PFWY5E87HXER"
                target="_blank"
                rel="noreferrer"
              >
                Introduction to Software Product Management
              </a>
            </dd>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/certificate/R584TFYEDRX9"
                target="_blank"
                rel="noreferrer"
              >
                Software Processes and Agile Practices
              </a>
            </dd>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/certificate/LC7S3EFC3CD5"
                target="_blank"
                rel="noreferrer"
              >
                Client Needs and Software Requirements
              </a>
            </dd>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/certificate/4HZQZNK4FYAA"
                target="_blank"
                rel="noreferrer"
              >
                Agile Planning for Software Products
              </a>
            </dd>
            <dd>
              <a
                href="https://www.coursera.org/account/accomplishments/certificate/GCK7AM88QAQK"
                target="_blank"
                rel="noreferrer"
              >
                Reviews &amp; Metrics for Software Improvements
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 10
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
