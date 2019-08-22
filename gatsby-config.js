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
        guid: "046a1a87", //your Agility Content Fetch API Guid
        apiKey: "defaultlive.2b7f3a91559d794bedb688358be5e13af2b1e3ae8cd39e8ed2433bbef5d8d6ac", //your Agility Content Fetch API Key
        sharedContent: ['posts', 'globalheader'], //a list of reference names you want to include in your GraphQL store
        languages: [ 'en-us' ], //the languages you want to include
        channels: [ 'website' ], //the channels you want to include
        defaultPageTemplate: './src/templates/AgilityPage.js', //the page template that will be used to render Agility CMS pages
        indexPage: '/home' //If you want an Agility CMS page to be your home page (i.e. '/home' to be used as '/'), set the page path here
      }
    }
  ]
}