import React, { Component } from 'react';
import { Link } from 'gatsby'
import './PostListing.css'
import truncate from 'truncate-html'

class PostsListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            dynamicUrls: {}
        }
    }
    async componentDidMount() {
        // const api = this.props.agility.client;
        // try {
        //     //TODO: Need a proper way to cache the sitemap
        //     //get sitemap first, need it to find the dynamic urls
        //     let sitemap = await api.getSitemapFlat({
        //         channelName: this.props.agility.config.channelName,
        //         languageCode: this.props.agility.config.languageCode
        //     });

        //     //then get our posts
        //     let contentListResult = await api.getContentList({
        //         referenceName: 'posts',
        //         languageCode: this.props.agility.config.languageCode
        //     });

        //     const dynamicUrls = this.resolvePostUrls(sitemap, contentListResult.items)
        //     this.setState({ posts: contentListResult.items, dynamicUrls: dynamicUrls })

        // } catch (error) {
        //     if (console) console.error(error);
        // }

    }
    resolvePostUrls(sitemap, posts) {
        let dynamicUrls = {};
        posts.forEach(post => {
            Object.keys(sitemap).forEach(path => {
                if (sitemap[path].contentID === post.contentID) {
                    dynamicUrls[post.contentID] = path;
                }
            })
        })
        return dynamicUrls;
    }
    renderPostExcerpt(html) {
        const excerpt = truncate(html, { stripTags: true, length: 160 });
        return { __html: excerpt };
    }
    renderPosts() {
        if (this.state.posts != null) {
            let posts = [];
            this.state.posts.forEach(item => {
                posts.push(
                    <div className="post" key={item.contentID}>
                        {item.fields.image &&
                            <img src={item.fields.image.url + '?w=860'} alt={item.fields.image.label} />
                        }
                        <h2>
                            <Link to={this.state.dynamicUrls[item.contentID]}>{item.fields.title}</Link>
                        </h2>
                        <p dangerouslySetInnerHTML={this.renderPostExcerpt(item.fields.details)}></p>
                    </div>
                )
            })

            return posts;
        }
    }
    render() {

        return (
            <section className="posts-listing">
                {/* <div className="container">
                    <h1>{this.props.item.fields.title}</h1>
                    {this.renderPosts()}
                </div> */}
            </section>
        );
    }
}

export default PostsListing;
