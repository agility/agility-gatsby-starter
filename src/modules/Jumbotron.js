import React, { Component } from 'react';
import { graphql } from "gatsby"
import './Jumbotron.css'

export default class Jumbotron extends Component {
    render() {    
        //TODO: get fields from graphQL
        //console.warn('Jumbotron', this.props)
        console.warn('Jumbotron', this);
        return (
            <section className="jumbotron">
                <h1>{this.props.item.fields.title}</h1>
                <h2>{this.props.item.fields.subTitle}</h2>
            </section>
        );
    }
}

export const query = graphql`
query MyQuery {
    allAgilityModuleJumbotron {
      nodes {
        item {
          properties {
            referenceName
          }
          contentID
          fields {
            subTitle
            title
          }
        }
      }
    }
  }  
`
