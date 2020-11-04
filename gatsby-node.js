const agility = require('./src/agility/utils')
const { createRemoteFileNode } = require("gatsby-source-filesystem")

let usingDefaultData = false;

exports.sourceNodes = async (args, configOptions) => {
	const { actions, createNodeId, createContentDigest, getNode, getNodes, store, cache, reporter } = args;
	const { createNode, deleteNode, deletePage, touchNode } = actions

	const existingNodes = await getNodes().filter(n => n.internal.type.indexOf(`agility`) !== -1)

	if (existingNodes.length === 0) {

		console.log("Agility CMS Starter => Creating Default Content")
		usingDefaultData = true
		//create the default agility nodes so that the project can be built with no config
			await createNode({
				id: createNodeId(`sitemap-0-0`),
				parent: null,
				children: [],
				languageCode: "en-us",
				pagePath: "/",
				path: "/",
				menuText: "x",
				pageID: 0,
				internal: {
					type: "agilitySitemapNode",
					content: "",
					contentDigest: "defaultsitemapnode"
				}
			});

			await createNode({
				id: createNodeId(`agilitypage-0-0`),
				parent: null,
				children: [],
				languageCode: "z",
				itemID: 0,
				pageJson: "",
				internal: {
					type: "agilitypage",
					content: "",
					contentDigest: "agilitypage"
				}
			});

			await createNode({
				id: createNodeId(`agilityitem-0-0`),
				parent: null,
				children: [],
				languageCode: "z",
				itemID: 0,
				itemJson: "",
				internal: {
					type: "agilityitem",
					content: "",
					contentDigest: "agilityitem"
				}
			});

			await createNode({
				id: createNodeId(`agilityGlobalHeader-0-0`),
				parent: null,
				children: [],
				languageCode: "en-us",
				itemid: 0,
				contentID: 0,
				customFields: { siteName: "x"},
				properties: { referenceName: "globalheaderx"},
				internal: {
					type: "agilityGlobalHeader",
					content: "",
					contentDigest: "agilityGlobalHeader"
				}
			});

			await createNode({
				id: createNodeId(`agilityPost-0-0`),
				parent: null,
				children: [],
				languageCode: "en-us",
				itemid: 0,
				contentID: 0,
				customFields: { title: "", details: "", image: {
					url: "https://via.placeholder.com/350x150",
					label: "Placeholder",
					width: 350,
					height: 150,
					pixelWidth: 350,
					pixelHeight: 150
				}},
				sitemapNode: {},
				properties: { referenceName: "postsx"},
				internal: {
					type: "agilityPost",
					content: "",
					contentDigest: "agilityPost"
				}
			});


	}
}

exports.createPages = async (args, configOptions) => {
	const { graphql, actions, getNode, createNodeId, createContentDigest, store } = args;
	const { createPage, deletePage, createNode, createRedirect, createPageDependency } = actions;

	if (usingDefaultData) {
		createPage({
			path: `/`,
			component: require.resolve(`./src/BlankPage.js`),
			context: {  },
		})
	}
}

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


      if(node.customFields[field] !== null){

        const fieldKeys = Object.keys(node.customFields[field]);

        if(
          fieldKeys !== undefined &&
          fieldKeys !== null &&
            fieldKeys.includes(`url`) &&
            fieldKeys.includes(`pixelHeight`) &&
            fieldKeys.includes(`pixelWidth`) &&
            fieldKeys.includes(`width`) &&
            fieldKeys.includes(`height`)
              ) {
  
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
          }
        })
    }
  }

  const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}