var agility = require('@agility/content-fetch')
var path = require('path')

const aglClient = agility.getApi({
    guid: 'ade6cf3c',
    apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb'
})

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { createNode } = actions
    // Create nodes here, generally by downloading data
    // from a remote API.
    
    const sharedContentReferenceNames = [ 'posts', 'globalheader']
    
    await asyncForEach(sharedContentReferenceNames, async (refName) => {
        //Source Content from Shared Content in Agility
        var data = await aglClient.getContentList({ referenceName:refName, languageCode: "en-us" }); 

        await asyncForEach(data.items, async (ci) => {
            ci.props = ci.fields;
            delete ci.fields;

            const nodeContent = JSON.stringify(ci);

            const nodeMeta = {
                id: createNodeId(`${refName}-${ci.contentID }`),
                parent: null,
                children: [],
                internal: {
                    type: `AgilityContent${refName}`,
                    content: nodeContent,
                    contentDigest: createContentDigest(ci)
                }
            }
            const node = Object.assign({}, ci, nodeMeta);
            
            await createNode(node);
        })
    }); 

    
    //Source Content from Shared Content in Agility
    var sitemapNodes = await aglClient.getSitemapFlat({ channelName: 'website', languageCode: 'en-us'}); 
    //console.log(sitemapNodes);
    await asyncForEach(Object.values(sitemapNodes), async (sitemapNode) => {

        const page = await aglClient.getPage({ pageID: sitemapNode.pageID, languageCode: 'en-us'});
        
        const nodeContent = JSON.stringify(page);
        const nodeMeta = {
            id: createNodeId(`page-${page.pageID }`),
            parent: null,
            children: [],
            internal: {
                type: 'AgilityPage',
                content: nodeContent,
                contentDigest: createContentDigest(page)
            }
        }
        const pageNodeToCreate = Object.assign({}, page, nodeMeta);
        
        await createNode(pageNodeToCreate);

        //now create a node for each sitemap entry as well
        const sitemapNodeContent = JSON.stringify(sitemapNode);
        const sitemapNodeMeta = {
            id: createNodeId(`sitemap-${sitemapNode.path }`),
            parent: null,
            children: [],
            internal: {
                type: 'AgilitySitemapNode',
                content: sitemapNodeContent,
                contentDigest: createContentDigest(sitemapNode)
            }
        }
        const sitemapNodeToCreate = Object.assign({}, sitemapNode, sitemapNodeMeta);
        
        await createNode(sitemapNodeToCreate);
    })

    // We're done, return.
    return
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const pageTemplate = path.resolve(`src/templates/agility-page.js`);

    return graphql(`
    query MyQuery {
        allAgilitySitemapNode {
          nodes {
            name
            contentID
            pageID
            path
            title
            menuText
          }
        }
        allAgilityPage {
          nodes {
            templateName
            zones {
              MainContentZone {
                module
                item {
                  contentID
                }
              }
            }
            seo {
              metaDescription
              metaHTML
              metaKeywords
            }
            name
            securePage
            scripts {
              excludedFromGlobal
            }
            redirectUrl
            properties {
              modified
              state
              versionID
            }
            pageType
            pageID
            menuText
            title
            visible {
              menu
            }
          }
        }
      }      
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allAgilitySitemapNode.nodes.forEach(node => {
        
        const page = result.data.allAgilityPage.nodes.find(agilityPage => {
            return agilityPage.pageID === node.pageID;
        })

    
        createPage({
            // Path for this page — required
            path: `${node.path}`,
            component: pageTemplate,
            context: { sitemapnode: node, page: page },
        })
    })
  })



}

exports.onCreateNode = args => {
    //console.log('test');
}

