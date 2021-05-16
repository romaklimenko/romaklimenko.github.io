import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Dirty = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="d3.ru" />
      <div className="row">
        <div className="col-md-8">
          <br />
          <h1>¯\_(ツ)_/¯</h1>
          <br />
          <p>Здесь был <Link to="/blog/2021/d3/">сайт</Link> со статистикой и визуализациями по d3.ru,
          но его пришлось закрыть. </p>
          <p>Тем не менее, весь код открыт и желающие могут попробовать
          самостоятельно поднять упавшее знамя:</p>
          <ul>
            <li>
              <a href="https://github.com/romaklimenko/dirty" target="_blank" rel="noreferrer">dirty</a> – Angular-приложение, находившееся по этому адресу.
            </li>
            <li>
              <a href="https://github.com/romaklimenko/dirty-server" target="_blank" rel="noreferrer">dirty-server</a>
              { } – сервис REST API.
            </li>
            <li>
              <a href="https://github.com/romaklimenko/dirty-toolset" target="_blank" rel="noreferrer">dirty-toolset</a>
              { } – набор инструментов для d3.ru.
            </li>
            <li>
              <a href="https://github.com/romaklimenko/botan" target="_blank" rel="noreferrer">botan</a>
              { } – тот самый <a href="https://d3.ru/user/botan/" target="_blank" rel="noreferrer">Ботан</a>.
            </li>
            <li>
              <a href="https://github.com/romaklimenko/d3ru" target="_blank" rel="noreferrer">d3ru</a>
              { } – старый <Link to="/blog/2019/d3/">сайт</Link>, с которого <a href="https://dataisbeautiful.d3.ru/odin-god-1777478/?sorting=rating" rel="noreferrer" target="_blank">всё начиналось</a>.
            </li>

            <hr />
            
            <li>
              <a href="https://github.com/romaklimenko/dirty-api" target="_blank" rel="noreferrer">dirty-api</a>
              { } – Postman-коллекция запросов к API d3.ru.
            </li>
            <li>
              <a href="https://chrome.google.com/webstore/detail/d3ru%2B%2B/kgfnllklobnkppnongnnbkfikibbkcnb?hl=ru&amp;authuser=0" target="_blank" rel="noreferrer">d3.ru++</a>
              { } – расширение для Google Chrome.
            </li>
            <li>
              <a href="https://gist.github.com/romaklimenko/420844a8ce06937d55254b62b8a02629" target="_blank" rel="noreferrer">lopatkin</a>
              { } – банит одним махом на всех сообществах в списке.
            </li>

            <hr />

            <li>
              <a href="https://github.com/romaklimenko/masterok" target="_blank" rel="noreferrer">masterok</a>
              { } – автоматические посты на dirty из RSS.
            </li>
            <li>
              <a href="https://github.com/romaklimenko/pikabu" target="_blank" rel="noreferrer">peekaboo</a>
              { } – <a href="https://peekaboo.d3.ru/" target="_blank" rel="noreferrer">автоматические посты</a> на dirty из Telegram-канала Пикабу.
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default Dirty

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
