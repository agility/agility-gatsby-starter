import React, { Component } from "react"
import { Link, graphql, StaticQuery } from "gatsby"

import "./GlobalHeader.css"

export default (props) => (
  <StaticQuery
    query={graphql`
      query GlobalHeaderQuery {
        agilityGlobalHeader(
          properties: { referenceName: { eq: "globalheader" } }
        ) {
          customFields {
            siteName
          }
        }
        allAgilitySitemapNode {
          nodes {
            languageCode
            path
            menuText
            pageID
          }
        }
      }
    `}
    render={(queryData) => {
      const viewModel = {
        languages: props.languages,
        pagesInOtherLanguages: props.pagesInOtherLanguages,
        item: queryData.agilityGlobalHeader,
        menuLinks: queryData.allAgilitySitemapNode.nodes.filter(
          (sitemapNode) => {
            let isTopLevelPage = sitemapNode.path.split("/").length === 2
            const isThisLanguage =
              sitemapNode.languageCode === props.languageCode
            if (props.isMultiLanguage) {
              isTopLevelPage = sitemapNode.path.split("/").length === 3
            }
            //only return nodes from this language and top level links only
            return isThisLanguage && isTopLevelPage
          }
        ),
      }
      return <GlobalHeader {...viewModel} />
    }}
  />
)

class GlobalHeader extends Component {
  renderLinks = () => {
    let links = []
    this.props.menuLinks.forEach((node) => {
      links.push(
        <li key={node.pageID}>
          <Link to={node.path}>{node.menuText}</Link>
        </li>
      )
    })
    return links
  }
  render() {
    return (
      <header className="header">
        <div className="container">
          <Link to="/" className="logo-link">
            Home
          </Link>
          <label>{this.props.item.customFields.siteName}</label>
          <ul className="links">
            {this.renderLinks()}
            {/* if more than 1 language, render out language toggles */}
            {this.props.pagesInOtherLanguages.nodes.length >= 1
              ? this.props.pagesInOtherLanguages.nodes.map((node, i) => {
                  const languageCode = node.languageCode
                  const pagePath = node.path
                  return (
                    <li className="language-toggle-links" key={i}>
                      <Link key={i} to={pagePath}>
                        {languageCode}
                      </Link>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
      </header>
    )
  }
}
