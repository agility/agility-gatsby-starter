import React, { Component } from 'react';

export default class ContentZone extends Component {
    renderModules = () => {
        let modules = []

        const contentZoneName = this.props.name;
        const page = this.props.page;
        const dynamicPageItem = this.props.dynamicPageItem;
        const modulesForThisContentZone = page.zones[contentZoneName];

        if (modulesForThisContentZone === undefined) {
            console.error(`Cannot render modules for zone "${contentZoneName}". This does not appear to be a valid content zone for this page template.`)
            return;
        }

        modulesForThisContentZone.forEach(moduleItem => {
            const moduleDefName = moduleItem.item.properties.definitionName;
            const ModuleComponentToRender = this.props.modules[moduleDefName];
            const moduleProps = {
                key: moduleItem.item.contentID,
                dynamicPageItem: dynamicPageItem,
                item: moduleItem.item
            }


            if (ModuleComponentToRender) {
                modules.push(<ModuleComponentToRender {...moduleProps} />)
            } else {
                console.error(`No react component found for the module "${moduleDefName}". Cannot render module.`);
            }
        })

        return modules;
    }

    render() {
        return (
            <div className="content-zone">
                {this.renderModules()}
            </div>
        );
    }
}