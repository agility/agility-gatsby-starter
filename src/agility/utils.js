const getDynamicPageItem = ({ contentID, agilityItem }) => {
    if (contentID > 0 && agilityItem && agilityItem.itemJson) {
        return JSON.parse(agilityItem.itemJson);
    }
}

const buildPageViewModel = ( { pageContext, data }) => {
    //Check if we have a dynamic page item contentID, if so, we are rendering a dynamic page and should pass the content item to Modules 
    const dynamicPageItem = getDynamicPageItem({ 
        contentID: pageContext.contentID,
        agilityItem: data.agilityitem
    });

    const page = JSON.parse(data.agilitypage.pageJson);

    //build the our viewModel
    return {
        page: page,
        dynamicPageItem: dynamicPageItem,
        isPreview: pageContext.isPreview
    }
}

export {
    buildPageViewModel
}