import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby'
import { cleanHTML} from '../agility/utils'
import truncate from 'truncate-html'
import './PostListing.css'
import Img from 'gatsby-image'

export default (props) => (
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
                    customFields {
                        title
                        details
                        imageLocalImg {
                            childImageSharp {
                                fluid(quality: 90, maxWidth: 480, maxHeight: 350) {
                                  ...GatsbyImageSharpFluid
                                }
                              }
                        }
                    }
                    sitemapNode {
                        pagePath
                    }
                    properties {
                        referenceName
                    }
                }
            }
          }
        `}
		render={queryData => {
			return (
				<PostsListing posts={queryData.allAgilityPost.nodes} {...props} />
			);
		}}
	/>
)

const PostsListing = ({ item, posts }) => {
    return (
        <section className="posts-listing" >
            <div className="container">
                <h1>{item.customFields.title}</h1>
                <div className="posts-listing-container">
                    <Posts posts={posts} />
                </div>
            </div>
        </section>
    )
}

const Posts = ({ posts }) => {
    return posts.map(post => {
        return <Post key={post.contentID} post={post} />;
    })
}

const Post = ({ post }) => {
    
    if(!post.sitemapNode) return;
    return(
        <div className="post" key={post.contentID}>
            <Link to={post.sitemapNode.pagePath}>
                <PostImage image={post.customFields.imageLocalImg} label={post.customFields.image ? post.customFields.image.label : `Post Image`} />
                <h2>{post.customFields.title}</h2>
                <PostExceprt htmlContent={post.customFields.details} />
            </Link>
        </div>
    )
}

const PostImage = ({ image, label }) => {
    let imageToRender = null;
    
    if(image && image.childImageSharp) {

        imageToRender = <Img fluid={image.childImageSharp.fluid} alt={label} /> 
    }
    return imageToRender;
}

const PostExceprt = ({ htmlContent }) => {
    const renderHTML = () => {
        const excerpt = truncate(cleanHTML(htmlContent), { stripTags: true, length: 160 });
		return { __html: excerpt };
    }
    return(<p dangerouslySetInnerHTML={renderHTML()}></p>)
}
