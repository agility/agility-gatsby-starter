import React, { Component } from 'react';

export default class AgilityPage extends Component {
    render() {
        console.log(this.props.pageResources.json.pageContext)    
        return (
        <div className="one-column-template">
            <pre>{this.props.pageResources.json.pageContext.sitemapnode.title}</pre>
        </div>
        );
    }
}
