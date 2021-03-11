import React from "react"

const AgilityPageTemplate = props => {
  // get the page template name that we need to render
  const pageTemplateName = props.page.templateName.replace(/[^0-9a-zA-Z]/g, "")

  let PageTemplateComponentToRender = null

  // check for page template .jsx file extension
  try {
    PageTemplateComponentToRender = require(`../../pageTemplates/${pageTemplateName}.jsx`)
      .default
  } catch (err) {
    console.log(`Could not load Page Template: ${pageTemplateName} via jsx.`)
  }
  if (!PageTemplateComponentToRender) {
    // check for page template .js file extension
    try {
      PageTemplateComponentToRender = require(`../../pageTemplates/${pageTemplateName}.js`)
        .default
    } catch (err) {
      console.log(`Could not load Page Template: ${pageTemplateName} via js.`)
    }
  }

  //const PageTemplateComponentToRender = props.pageTemplates[pageTemplateName];
  delete props.pageTemplates
  return <PageTemplateComponentToRender {...props} />
}

export default AgilityPageTemplate
