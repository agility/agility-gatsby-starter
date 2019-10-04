import React, { Component } from 'react';
import { Link, graphql, StaticQuery } from "gatsby"

import './GlobalHeader.css'

export default props => (
    
    <StaticQuery
        query={graphql`
        query GlobalHeaderQuery {
            allAgilityContentGlobalHeader {
              nodes {
                myFields {
                  siteName
                }
                languageCode
              }
            }
            allAgilitySitemapNode {
              nodes {
                pageID
                path
                menuText
                visible {
                  menu
                }
                languageCode
              }
            }
          }          
        `}
        render={queryData => {
            console.log(props)
            const viewModel = {
                item: queryData.allAgilityContentGlobalHeader.nodes.find(globalHeader => {
                    return globalHeader.languageCode === props.languageCode
                }),
                menuLinks: queryData.allAgilitySitemapNode.nodes.filter(sitemapNode => {
                    //only return top level links 
                    if(props.agilityConfig.languages.length > 1) {
                        //need to account for language path
                        return (sitemapNode.path.split('/').length === 3) && sitemapNode.languageCode === props.languageCode
                    } else {
                        //for no language path
                        return (sitemapNode.path.split('/').length === 2) && sitemapNode.languageCode === props.languageCode
                    }
                    
                }),
                nodesInOtherLanguages: props.sitemapNode.nodesInOtherLanguages
            }
            return (
                <GlobalHeader {...viewModel} />
            );
        }}
    />
)

class GlobalHeader extends Component {
    renderLinks = () => {
        let links = [];
        this.props.menuLinks.forEach(node => {
            links.push(<li key={`${node.pageID}-${node.languageCode}`}><Link to={node.path}>{node.menuText}</Link></li>)
        })
        return links;
    }
    renderLanguageSwitchLink = () => {
        let links = [];
        this.props.nodesInOtherLanguages.forEach(node => {
            links.push(<li key={`${node.pageID}-${node.languageCode}`}>Switch to: <Link to={node.path}>{node.menuText} ({node.languageName})</Link></li>)
        })
        return links;
    }
    render() {
        console.log('header', this.props);
        return (
            <header className="header">
                <div className="container">
                    <label>{this.props.item.myFields.siteName}</label>
                    <ul>
                        {this.renderLinks()}
                        {this.renderLanguageSwitchLink()}
                    </ul>
                </div>
            </header>
        );
    }
}


