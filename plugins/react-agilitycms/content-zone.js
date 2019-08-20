import React, { Component } from 'react';

export default class ContentZone extends Component {

    componentDidMount() { }

    renderModules = () => {
        let modules = []

        const contentZoneName = this.props.name;
        console.log("this.props.modules", this.props.modules)
        console.log("zones", this.props.pageContext.page.zones);
        const modulesForThisContentZone = this.props.pageContext.page.zones[contentZoneName];
    

        if (modulesForThisContentZone === undefined) {
            console.error(`Cannot render modules for zone "${contentZoneName}". This does not appear to be a valid content zone for this page template.`)
            return;
        } else {
            console.log(contentZoneName + " rendered...")
        }

        modulesForThisContentZone.forEach(moduleItem => {
            console.log('moduleItem', moduleItem);
            const ModuleComponentToRender = this.props.modules[moduleItem.item.properties.definitionName];
            if (ModuleComponentToRender) {
                modules.push(<ModuleComponentToRender key={moduleItem.item.contentID} {...moduleItem} />)
            } else {
                console.error(`No react component found for the module "${moduleItem.module}". Cannot render module.`);
            }
        })

        return modules;
    }

    render() {
        console.warn("contentzone", this.props)
        const renderModules = this.renderModules();

        return (
            <div>
                {renderModules}
            </div>
        );
    }
}



