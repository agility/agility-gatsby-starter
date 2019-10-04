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
      // The name of the plugin
      resolve: "@agility/gatsby-source-agilitycms", 
      options: {
        // Your Agility Content Fetch API Guid
        guid: agilityConfig.guid, 
        // Your Agility Content Fetch API Key
        apiKey: agilityConfig.accessToken, 
        // Set this to true if you are using the preview API Key
        isPreview: agilityConfig.isPreview, 
        // A list of reference names you want to include in your GraphQL store
        sharedContent: ["posts", "globalheader"], 
        // Your list of languages
        languages: [{
            // The name of the language code
            name: "English",
            // The actual language code set in Agility CMS
            code: "en-us", 
            // The name to be used in the URL path that represents the current language
            path: "en", 
            // The path to the Agility CMS page that you want to use as your root/home page
            homePagePath: "/home" 
          },
          {
            // The name of the language code
            name: "French",
            // The actual language code set in Agility CMS
            code: "fr-ca", 
            // The name to be used in the URL path that represents the current language
            path: "fr", 
            // The path to the Agility CMS page that you want to use as your root/home page
            homePagePath: "/chateau"       
          }
        ], 
        // The channels you want to include
        channels: [{
          // The reference name for the website channel as it is defined in Agility CMS
          referenceName: "website"
        }], 
        // The master page template that will be used to render Agility CMS pages
        masterPageTemplate: "./src/templates/AgilityPage.js", 
      },
    },
  ],
}
