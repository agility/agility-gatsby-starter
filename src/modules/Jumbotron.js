import React from 'react';
import './Jumbotron.css'

const Jumbotron = ({ item }) => {
	let jumboTronStyle = {};
	if (item.customFields.backgroundImage) {
		jumboTronStyle.backgroundImage = "url('" + item.customFields.backgroundImage.url + "?w=1000')";
	}
	return (
		<section className="jumbotron" style={jumboTronStyle}>
			<h1>{item.customFields.title}</h1>
			<h2>{item.customFields.subTitle}</h2>
		</section>
	);
}
export default Jumbotron;

