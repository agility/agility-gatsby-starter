import React, { Component } from 'react';

export default class ContentZone extends Component {

    componentDidMount() { }

    renderModules = () => {
        let modules = []

        const contentZoneName = this.props.name;
        const modulesForThisContentZone = this.props.pageContext.page.zones[contentZoneName];

        if (modulesForThisContentZone === undefined) {
            console.error(`Cannot render modules for zone "${contentZoneName}". This does not appear to be a valid content zone for this page template.`)
            return;
        }

        modulesForThisContentZone.forEach(moduleItem => {
            const ModuleComponentToRender = this.props.modules[moduleItem.module];
            if (ModuleComponentToRender) {
                const propsToModule = {
                    refercenceName: moduleItem.item.properties.referenceName,
                    pageInSitemap: this.props.pageContext.sitemapnode,
                }
                modules.push(<ModuleComponentToRender key={moduleItem.item.contentID} {...propsToModule} />)
            } else {
                console.error(`No react component found for the module "${moduleItem.module}". Cannot render module.`);
            }
        })

        return modules;
    }

    render() {
        console.warn(this.props)
        const renderModules = this.renderModules();

        return (
            <div>
                {renderModules}
            </div>
        );
    }
}



