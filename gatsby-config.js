/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */


 module.exports = {
  siteMetadata: {
    title: "Gatsby Default Starter",
  },
  plugins: [
    {
      resolve: "gatsby-source-agility",
      options: {
        guid: "046a1a87",
        apiKey: "defaultlive.2b7f3a91559d794bedb688358be5e13af2b1e3ae8cd39e8ed2433bbef5d8d6ac",
        sharedContent: ['posts', 'globalheader'],
        languages: [ 'en-us' ],
        channels: [ 'website' ],
        indexPage: '/home'
      },
    },
  ],
}