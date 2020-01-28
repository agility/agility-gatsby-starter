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
        debug: true,
        sharedContent: ["posts", "globalheader", "globalfooter"], //a list of reference names you want to include in your GraphQL store
        languages: [{
          // The name of the language code
          name: "English",
          // The actual language code set in Agility CMS
          code: "en-us", 
          // The name to be used in the URL path that represents the current language
          path: "en", 
          // The path to the Agility CMS page that you want to use as your root/home page
          homePagePath: "/home" 
        }], 
        // The channels you want to include
        channels: [{
          // The reference name for the website channel as it is defined in Agility CMS
          referenceName: "website"
        }],
        masterPageTemplate: "./src/templates/AgilityPage.js", //the page template that will be used to render Agility CMS pages
      },
    },
  ],
}
