import React, { Component } from 'react';
import { graphql, StaticQuery } from "gatsby"

import './Jumbotron.css'

export default props => (
    <StaticQuery
        query = {graphql `
        query MyQuery {
            allAgilityContentGlobalHeader {
              nodes {
                myFields {
                  siteName
                }
              }
            }
          }           
        `}
        render={ queryData =>  {
            const viewModel = {
                item: props.item,
                globalHeader: queryData.allAgilityContentGlobalHeader.nodes[0]
            }
            return(
                <Jumbotron {...viewModel}/>  
            );
        }}
    /> 
)

class Jumbotron extends Component {
    render() {    
        console.log('jumbotron', this.props);
        return (
            <section className="jumbotron">
                <h1>{this.props.item.fields.title}</h1>
                <h2>{this.props.item.fields.subTitle}</h2>
            </section>
        );
    }
}


