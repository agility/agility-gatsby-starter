import React, { Component } from 'react';
import modules from '../modules/_allModules.js/index.js'
import pageTemplates from '../templates/_allPageTemplates.js'

import GlobalHeader from '../components/GlobalHeader.js/index.js'


export default class AgilityPage extends Component {
    render() {
        
        const pageTemplateName = this.props.pageResources.json.pageContext.page.templateName.replace(/[^0-9a-zA-Z]/g, '');
        const propsForPageTemplate = {
            pageContext: this.props.pageResources.json.pageContext,
            modules: modules
        }
        const PageTemplateComponentToRender = pageTemplates[pageTemplateName];

        return (
            <div id="inner-body">
                <GlobalHeader />
                <PageTemplateComponentToRender {...propsForPageTemplate} />
            </div>
        );
    }
}


