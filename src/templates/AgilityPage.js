import React, { Component } from 'react';

import './AgilityPage.css'

//You need to pass-down the available modules to the app because they will be rendered dynamically
import modules from '../modules/_allModules.js'
import pageTemplates from './_allPageTemplates.js'

import GlobalHeader from '../components/GlobalHeader.js'


export default class AgilityPage extends Component {
    render() {
        const pageTemplateName = this.props.pageContext.page.templateName.replace(/[^0-9a-zA-Z]/g, '');
        const propsForPageTemplate = {
            pageContext: this.props.pageContext,
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