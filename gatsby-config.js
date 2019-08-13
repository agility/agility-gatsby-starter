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
        guid: "ade6cf3c",
        apiKey: "defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb",
        sharedContent: ['posts', 'globalheader'],
        languages: [ 'en-us' ],
        channels: [ 'website' ]
      },
    },
  ],
}