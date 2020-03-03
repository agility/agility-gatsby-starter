
//[Not Implemented]
//This file serves an example of a basic implementation of an 'Image Slider' module - this module does not exist in the current Blog Template

// import React from 'react';
// import { graphql, StaticQuery } from 'gatsby'


// export default (props) => (
// 	<StaticQuery
// 		query={graphql`
//         query ImageSliderQuery {
//             allAgilityImageSlider {
//                 nodes {
//                     properties {
//                         referenceName
//                     }
//                     linkedContent_agilitySlides {
//                         contentID
//                         customFields {
//                             image {
//                                 url
//                             }
//                         title
//                         }
//                     }
//                 }
//             }
//         }              
//         `}
// 		render={queryData => {
//             const thisModuleInstance = queryData.allAgilityImageSlider.nodes.filter(
//                 module => module.properties.referenceName === props.item.properties.referenceName
//             )
// 			return (
// 				<ImageSlider slides={thisModuleInstance[0].linkedContent_agilitySlides} {...props} />
// 			);
// 		}}
// 	/>
// )

// const ImageSlider = ({ slides, item }) => {
// 	return (
// 		<section>
// 			<p>This is my image slider</p>
//             <Slides slides={slides} />
// 		</section>
// 	);
// }

// const Slides = ({ slides }) => {
//     return slides.map(slide => {
//         return <Slide key={slide.contentID} slide={slide} />
//     })
// }

// const Slide = ({slide}) => {
//     return <img src={slide.customFields.image.url} alt={slide.customFields.image.label} />
// }

