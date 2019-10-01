require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

//configure your agility plugin with environment variables so that
//your agility api credentials stay secure
const agilityConfig = {
  guid: process.env.AGILITY_GUID,
  accessToken: process.env.AGILITY_API_KEY,
  isPreview: process.env.AGILITY_API_ISPREVIEW
}

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Agility CMS Gatsby Starter",
  },
  plugins: [
    {
      resolve: "@agility/gatsby-source-agilitycms", //the name of the plugin
      options: {
        guid: agilityConfig.guid, //your Agility Content Fetch API Guid
        apiKey: agilityConfig.accessToken, //your Agility Content Fetch API Key
        isPreview: agilityConfig.isPreview, //set this to true if you are using the preview API Key
        sharedContent: ["posts", "globalheader"], //a list of reference names you want to include in your GraphQL store
        languages: ["en-us"], //the languages you want to include
        channels: ["website"], //the channels you want to include
        defaultPageTemplate: "./src/templates/AgilityPage.js", //the page template that will be used to render Agility CMS pages
        indexPage: "/home", //If you want an Agility CMS page to be your home page (i.e. '/home' to be used as '/'), set the page path here
      },
    },
  ],
}
