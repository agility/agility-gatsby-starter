import React from 'react'
import { Helmet } from "react-helmet"

const SEO = ({ title, description }) => {
    return (
        <Helmet 
            title={`${title}  - Blog Template`}
            meta={[
                {
                    name: `description`,
                    content: description
                }
            ]} 
        />
    )
}

export default SEO;

