const agility = require('./src/agility/utils')
const { createRemoteFileNode } = require("gatsby-source-filesystem")

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

exports.onCreateNode = async ({
    node,
    actions: { createNode },
    store,
    cache,
    createNodeId,
  }) => {
    // For all Agility nodes that have an attachment field, call createRemoteFileNode
    if (
      node.internal.type.indexOf(`agility`)  > -1 && 
      node.customFields
      && (
          node.internal.type.indexOf(`agilitypage`) == -1 &&
          node.internal.type.indexOf(`agilitystate`) == -1 &&
          node.internal.type.indexOf(`agilitysitemap`) == -1 &&
          node.internal.type.indexOf(`agilitynestedsitemap`) == -1 &&
          node.internal.type.indexOf(`agilitySitemapNode`) == -1 &&
          node.internal.type.indexOf(`agilityitem`) == -1
          )
    ) {
        const customFields = Object.keys(node.customFields);
        await asyncForEach(customFields, async (field) => {
        
            const fieldKeys = Object.keys(node.customFields[field]);
            if(
                fieldKeys.includes(`url`) &&
                fieldKeys.includes(`pixelHeight`) &&
                fieldKeys.includes(`pixelWidth`) &&
                fieldKeys.includes(`width`) &&
                fieldKeys.includes(`height`)
            ) {
                console.log(`found ${field} on ${node.internal.type}`)
                let fileNode = await createRemoteFileNode({
                    url: node.customFields[field].url, // string that points to the URL of the image
                    parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
                    createNode, // helper function in gatsby-node to generate the node
                    createNodeId, // helper function in gatsby-node to generate the node id
                    cache, // Gatsby's cache
                    store, // Gatsby's redux store
                  })
                  // if the file was created, attach the new node to the parent node
                  if (fileNode) {
                    node.customFields[`${field}LocalImg___NODE`] = fileNode.id
                  }
            }
        })
    }
  }

  const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}