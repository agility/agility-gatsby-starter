import React from 'react';


const ContentZone = ({ name, page, dynamicPageItem }) => {

	const Modules = () => {
		let modules = []
		const modulesForThisContentZone = page.zones[name];

		if (modulesForThisContentZone === undefined) {
			console.error(`Cannot render modules for zone "${name}". This does not appear to be a valid content zone for this page template.`)
			return;
		}



		modulesForThisContentZone.forEach(moduleItem => {
			if (moduleItem.item) {
				const moduleDefName = moduleItem.item.properties.definitionName;

				try {
					const ModuleComponentToRender = require(`../../modules/${moduleDefName}.js`).default;

					if (ModuleComponentToRender) {
						const moduleProps = {
							key: moduleItem.item.contentID,
							dynamicPageItem: dynamicPageItem,
							item: moduleItem.item
						}
						modules.push(<ModuleComponentToRender {...moduleProps} />)
					} else {
						throw new Error(`No react component found for the module "${moduleDefName}". Cannot render module.`)
					}
				} catch (e) {
					console.error(`Error rendering module ${moduleDefName}`, e)
					modules.push(<div>Module {moduleDefName} could not be rendered.</div>)
				}
			}
		})

		return modules;
	}

	return (<Modules />)
}
export default ContentZone;