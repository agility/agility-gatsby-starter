import React, { Component } from 'react';
import { ContentZone } from '@agility/react-agilitycms'
import modules from '../modules/allModules.js'

export default class AgilityPage extends Component {
    render() {
        const propsForContentZone = {
            pageContext: this.props.pageResources.json.pageContext,
            modules: modules
        }
        return (
            <div className="one-column-template">
                 <ContentZone name='MainContentZone' {...propsForContentZone} />
                <pre>{this.props.pageResources.json.pageContext.sitemapnode.title}</pre>
            </div>
        );
    }
}
