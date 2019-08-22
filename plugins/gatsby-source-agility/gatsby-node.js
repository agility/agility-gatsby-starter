var agility = require('@agility/content-fetch')
var path = require('path')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, configOptions) => {
    const { createNode } = actions
    // Create nodes here, generally by downloading data
    // from a remote API.
    
    const aglClient = agility.getApi({
        guid: configOptions.guid,
        apiKey: configOptions.apiKey
    })

    const sharedContentReferenceNames = configOptions.sharedContent;
    const languages = configOptions.languages;
    const channels = configOptions.channels;

    // Source Shared Content ------------------------------------------------------------------------------
    const sourceSharedContent = async ({ aglClient, sharedContentReferenceNames, langCode }) => {
      await asyncForEach(sharedContentReferenceNames, async (refName) => {

        //Source Content from Shared Content in Agility
        var data = await aglClient.getContentList({ referenceName:refName, languageCode: langCode }); 
        

        await asyncForEach(data.items, async (ci) => {
            ci.myFields = ci.fields;
            delete ci.fields;
            const nodeContent = JSON.stringify(ci);
            
            const nodeMeta = {
                id: createNodeId(`${refName}-${ci.contentID}-${langCode}`),
                parent: null,
                children: [],
                internal: {
                    type: `AgilityContent_${ci.properties.definitionName}`,
                    content: nodeContent,
                    contentDigest: createContentDigest(ci + Date.now())
                }
            }
            const node = Object.assign({}, ci, nodeMeta);
          

            await createNode(node);
        })
      }); 
    }

    // Source Sitemap + Pages ---------------------------------------------------------------------------
    const sourceSitemap = async ({ channel, langCode }) => {
      const sitemapNodes = await aglClient.getSitemapFlat({ channelName: channel, languageCode: langCode}); 

      //loop through each sitemapnode in sitemap
      await asyncForEach(Object.values(sitemapNodes), async (sitemapNode) => {

          // Create node for this page
          const page = await aglClient.getPage({ pageID: sitemapNode.pageID, languageCode: langCode});
          
          //Hack: set re-jig the format of the `zones` property so that is it not a dictionary (GraphQL doesn't like this)
          let pageZones = [];

          Object.keys(page.zones).forEach((zoneName) => {
            const pageZone = {
              name: zoneName,
              modules: Object.values(page.zones[zoneName])
            }
            pageZones.push(pageZone);
          });

          //overwrite previous zones property
          page.zones = pageZones;

          const nodeContent = JSON.stringify(page);
          const nodeMeta = {
              id: createNodeId(`page-${channel}-${page.pageID}-${langCode}`),
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

          // Create nodes for each Module on this page - so they can be consumed with GraphQL -
          await asyncForEach(page.zones, async (zone) => {
            const modules = zone.modules;
            await asyncForEach(modules, async (mod) => {
              const moduleContent = JSON.stringify(mod);
              const moduleMeta = {
                  id: createNodeId(`${mod.item.properties.referenceName}-${langCode}`),
                  parent: null,
                  children: [],
                  internal: {
                      type: `AgilityModule_${mod.module}`,
                      content: moduleContent,
                      contentDigest: createContentDigest(mod)
                  }
              }
              const moduleNodeToCreate = Object.assign({}, mod, moduleMeta);
              await createNode(moduleNodeToCreate);
            })
          })

          // Now create a node for each sitemap entry as well
          const sitemapNodeContent = JSON.stringify(sitemapNode);
          const sitemapNodeMeta = {
              id: createNodeId(`sitemap-${channel}-${sitemapNode.path}-${langCode}`),
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
    }
  
    // DO THE WORK ----------------------------------------------------------------------------
    //Loop through each language
    await asyncForEach(languages, async (langCode) => {

        await sourceSharedContent({ aglClient, sharedContentReferenceNames, langCode});
        
        //Loop through each channel
        await asyncForEach(channels, async (channel) => {
          await sourceSitemap({ channel, langCode});
        })
    })
    
    // We're done, return.
    return
}

exports.createPages = async ({ graphql, actions }, configOptions) => {
    const { createPage } = actions

    const aglClient = agility.getApi({
        guid: configOptions.guid,
        apiKey: configOptions.apiKey
    })

    const pageTemplate = path.resolve(configOptions.defaultPageTemplate);

    const result  = await graphql(`
    query SitemapNodesQuery {
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
      }      
  `, { limit: 1000 }).then(async (result) => {
    if (result.errors) {
      throw result.errors
    }

    const modules = configOptions.modules;
    const pageTemplates = configOptions.pageTemplates;

    // Create pages loop...
    await asyncForEach(result.data.allAgilitySitemapNode.nodes, async (sitemapNode) => {
        
        const page = await aglClient.getPage({ pageID: sitemapNode.pageID, languageCode: "en-us"});
        
        let pagePath = sitemapNode.path;

        if(configOptions.languages.length > 1) {
          //More than one lang? Append language code to path
          pagePath = `/${page.properties.languageCode}${sitemapNode.path}`;
        }

        //if this is a dynamic page, grab the dynamic item and pass-it to the context
        let dynamicPageItem = null;
        if(sitemapNode.contentID)  {
          dynamicPageItem = await aglClient.getContentItem({ contentID: sitemapNode.contentID, languageCode: "en-us" });
        }

        createPage({
            // Path for this page — required
            path: pagePath,
            component: pageTemplate,
            context: { sitemapnode: sitemapNode, page, modules, pageTemplates, dynamicPageItem },
        })
        
        //if this page is supposed to be the default index page, create a duplicate for it
        if(configOptions.indexPage && pagePath === configOptions.indexPage) {
          pagePath = '/';
            createPage({
              // Path for this page — required
              path: pagePath,
              component: pageTemplate,
              context: { sitemapnode: sitemapNode, page, modules, pageTemplates, dynamicPageItem },
          })
        }

        

    })


  })



}

exports.onCreateNode = args => {
    //console.log('test');
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}



