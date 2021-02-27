import React from "react"
import { Helmet } from "react-helmet"
import ReactHtmlParser from "react-html-parser"

const SEO = ({ title, description, metaHTML, metaKeywords }) => {
  // setup and parse additional header markup
  let metaRawHtml = null
  if (metaHTML) {
    metaRawHtml = ReactHtmlParser(metaHTML)
  }
  return (
    <Helmet>
      <meta charset="utf-8" />
      <title>{`${title} - Blog Template`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={metaKeywords} />
      {metaRawHtml}
    </Helmet>
  )
}

export default SEO
