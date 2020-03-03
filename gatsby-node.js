const agility = require('./src/agility/utils')

//gatsy-node.js
//CREATE RESOLVERS *******************************************************************************************
exports.createResolvers = (args) => {

	const { createResolvers, getNode, createNodeId, createNode, createContentDigest, configOptions } = args;

	const resolvers = {
        //on the 'agilityPost' node type...
        agilityPost: {
            //get the sitemap node that represents this item - useful for retrieving the URL for the item
            sitemapNode: agility.getDynamicPageItemSitemapNode(),
            
            //[Not Implemented]
            //if we had a linked content field for 'author', this is how we'd get the author for this post in a single GraphQl query
            //linkedContent_agilityAuthor: agility.getLinkedContentItem({ type: 'agilityAuthor', linkedContentFieldName: 'author' })
        },

        //[Not Implemented]
        //if we had an 'Image Slider' module and it had a list of slides via a linked content field called 'slides', this is how we'd retrieve a list of those slides in a single GraphQL query
        // agilityImageSlider: {
        //     linkedContent_agilitySlides: agility.getLinkedContentList({ type: 'agilitySlide', linkedContentFieldName: 'slides' })
        // }
    }
	createResolvers(resolvers)
}
