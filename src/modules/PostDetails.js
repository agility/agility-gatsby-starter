import React, { Component } from 'react';


import './PostDetails.css'

class PostDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null
        }
    }
    async componentDidMount() {
        const api = this.props.agility.client;
        try {
            let post = await api.getContentItem({
                contentID: this.props.pageInSitemap.contentID,
                languageCode: this.props.agility.config.languageCode
            });

            this.setState({ post: post })

        } catch (error) {
            if (console) console.log(error);
        }
    }
    renderPostContent(html) {
        return { __html: html };
    }
    renderPost() {
        let post = null;

        if (this.state.post != null) {

            post = (
                <div className="post">
                    <h1>{this.state.post.fields.title}</h1>
                    {this.state.post.fields.image &&
                        <img src={this.state.post.fields.image.url + '?w=860'} alt={this.state.post.fields.image.label} />
                    }
                    <div className="post-content" dangerouslySetInnerHTML={this.renderPostContent(this.state.post.fields.details)}></div>
                </div>);

        }
        return post;
    }
    render() {
        return (
            <section className="post-details">
                <div className="container">
                    {this.renderPost()}
                </div>
            </section>
        );
    }
}

export default PostDetails;
