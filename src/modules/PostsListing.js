import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby'
import './PostListing.css'
import truncate from 'truncate-html'

export default props => (
	<StaticQuery
		query={graphql`
        query PostListingModuleQuery {
            allAgilityPost(
              filter: {
                properties: { referenceName: { eq: "posts"}}
              },
              limit: 10
            ) {
              totalCount
              nodes {
                contentID
                agilityFields {
                    title
                    details
                    image {
                        url
                    }

                }
                    properties {
                        referenceName
                    }
                }
            }
            allAgilitySitemapNode (
              filter: {
                contentID: {ne: -1}
              }
                ){
              nodes {
                contentID,
                path
              }
            }
          }
        `}
		render={queryData => {

			let posts = [];

			//get the dynamic URLs for each post
			queryData.allAgilityPost.nodes.forEach(post => {


				const sitemapNodeForPost = queryData.allAgilitySitemapNode.nodes.find(sitemapNode => {
					return post.contentID === sitemapNode.contentID;
				})



				post.dynamicUrl = sitemapNodeForPost.path;
				posts.push(post);
			})

			const viewModel = {
				item: props.item,
				posts: posts
			}
			return (
				<PostsListing {...viewModel} />
			);
		}}
	/>
)


/*
 category {
	item {
		agilityFields {
			title
		}
	}
}
author {
	item {
		agilityFields {
			name
		}
	}
}
*/

class PostsListing extends Component {
	renderPostExcerpt(html) {
		const excerpt = truncate(html, { stripTags: true, length: 160 });
		return { __html: excerpt };
	}
	renderPosts() {
		if (this.props.posts != null) {
			let posts = [];

			this.props.posts.forEach(post => {
				posts.push(
					<div className="post" key={post.contentID}>
						<Link to={post.dynamicUrl}>
							{post.agilityFields.image &&
								<img src={post.agilityFields.image.url + '?w=480'} alt={post.agilityFields.image.label} />
							}
							<h2>
								{post.agilityFields.title}
							</h2>
							{/* <div>{post.agilityFields.author.item.agilityFields.name} | {post.agilityFields.category.item.agilityFields.title}</div> */}
							<p dangerouslySetInnerHTML={this.renderPostExcerpt(post.agilityFields.details)}></p>
						</Link>
					</div>
				)
			})

			return posts;
		}
	}
	render() {

		return (


			<section className="posts-listing" >
				<div className="container">
					<h1>{this.props.item.fields.title}</h1>
					<div className="posts-listing-container">
						{this.renderPosts()}
					</div>
				</div>
			</section>
		);
	}
}
