<p align="center">
  <a href="https://gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" height="60" />
    <img alt="Gatsby" src="https://static.agilitycms.com/layout/img/logo-original.svg" width="200" />
  </a>
</p>
<h1 align="center">
  Gatsby + Agility CMS
</h1>
<p align="center"><a href="https://github.com/agility/agility-gatsby-starter/blob/master/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="This repo is released under the MIT license." />
</a> <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=producthunt" alt="code style: prettier" /></a>
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/a9f9e3f0-fdb0-4b12-8df5-a0c2c365c3c4/deploy-status)](https://app.netlify.com/sites/agility-gatsby-starter-gatsbycloud/deploys)
![Azure Static Web Apps CI/CD](https://github.com/agility/agility-gatsby-starter/workflows/Azure%20Static%20Web%20Apps%20CI/CD/badge.svg)

Want to learn about why [Agility CMS + Gatsby?](https://help.agilitycms.com/hc/en-us/articles/360039879872) is a match made in heaven?

This project is meant to be used with our **Blog Template**, and is a great starting point to get a Gatsby project up and running quickly with Agility CMS as the Content Management System.

# Features

1. [Gatsby V3](https://www.gatsbyjs.com/blog/gatsby-v3/) - The latest version of Gatsby’s core framework which introduces massive improvement to the developer and user experience.
2. [AgilityImage](https://github.com/agility/gatbsy-image-agilitycms) - A custom image component utilizing the new Gatsby Image Plugin that take's images stored within Agility CMS and handles all of the hard parts of displaying responsive images that follow best practices for performance on your website or application.
3. [Agility CMS Gatsby Source Plugin](https://github.com/agility/gatsby-source-agilitycms) - our official Gatsby plugin that will only refresh content that has changed since your last build, so you can rest easy your builds will be fast, regardless of how many pages you have.

**Preview Site** (Gatsby Cloud):
https://agility-gatsby-starter-5854363761.gtsb.io/

**Production Site** (Netlify):
https://agility-gatsby-starter-gatsbycloud.netlify.com/

## Documentation

[Learn how to get started with Gatsby and Agility CMS](https://help.agilitycms.com/hc/en-us/articles/360037873531)

## Table of contents

- [What is Agility CMS? What makes it different?](#what-is)
- [Getting up and running](#start)
- [How to build a production version of your project and test it](#build)
- [Deploy](#deploy)
- [Customizing your Agility Gatsby project further](#customizing)
- [What is Agility CMS? What makes it different?](#what-is)
- [Resources](#resources)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Code of conduct](#code-of-conduct)
- [License](#license)

<a name="start"></a>

# Getting up and running

## Pre-requisite: Install the Gatsby CLI

```
npm install -g gatsby-cli
```

[Additional information for getting started with Gatsby](https://www.gatsbyjs.org/tutorial/)

## Pre-requisite: Sign up for a Free Agility CMS Account

[Sign up for a free account using the Blog Template](https://account.agilitycms.com/sign-up?product=agility-free).

## Retreive your Agility CMS API Credentials

After signing up for a free account and logging into Agility CMS, click on the **Get API Keys** button on your dashboard.

![API Key Details](/docs/images/apiKeys.png "API Key Details")

Take note of your `GUID` and your `Live API Key` and `Preview API Key`. Copy these somewhere temporarily, or refer back to this screen when you begin to [Configure your local environment](#configure-local).

![API Key Details](/docs/images/apiKeyValues.png "API Key Details")

## Clone this repo to your local machine

```
git clone https://github.com/agility/agility-gatsby-starter
```

## Install Node dependencies

With [NPM](https://www.npmjs.com/get-npm)

```
cd agility-gatsby-starter
npm install
```

<a name="configure-local"></a>

## Configure your local environment

Rename `./.env.development.example` to `./.env.development`

```
cp .env.development.example .env.development
```

Add your development `AGILITY_GUID` and `AGILITY_API_KEY` variable values in `.env.development`

```
# Your Instance Id
AGILITY_GUID=

# Your Preview API Key (recommended) - you can get this from the Getting Started Page in Agility CMS. It starts with defaultpreview.
AGILITY_API_KEY=

# If using your Preview API Key, set this to true
AGILITY_API_ISPREVIEW=true

```

Rename `./.env.production.example` to `./.env.production`

```
cp .env.production.example .env.production
```

Add your production `AGILITY_GUID` and `AGILITY_API_KEY` variable values in `.env.production`

```
# Your Instance Id
AGILITY_GUID=

# Your Live API Key (recommended) - you can get this from the Getting Started Page in Agility CMS. It starts with defaultlive.
AGILITY_API_KEY=

# Since you won't want to preview here, set this to false
AGILITY_API_ISPREVIEW=false
```

## Start the Gatsby development server

Once the above steps are done, you can launch your local development server:

With [NPM](https://www.npmjs.com/get-npm)

```
npm start
```

<a name="build"></a>

# How to build a production version of your project and test it

It's good practice to build a production version and test it locally before publishing it or doing a pull request into `master`. Here's how to do it:

With [NPM](https://www.npmjs.com/get-npm)

```
npm run build
npm run serve
```

<a name="deploy"></a>

# Deploy

[![Deploy with Vercel](https://zeit.co/button)](https://vercel.com/import/git?c=1&s=https://github.com/agility/agility-gatsby-starter&env=AGILITY_GUID,AGILITY_API_KEY,AGILITY_API_PREVIEW&envDescription=API%20Keys%20required%20by%20Agility%20CMS&)

☝️ Deploy this starter repo in just minutes with [Vercel](https://zeit.co/). It will prompt you to enter your `AGILITY_GUID`, `AGILITY_API_KEY`, and `AGILITY_API_ISPREVIEW`.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/agility/agility-gatsby-starter)

☝️ Deploy this starter repo in just minutes with [Netlify](https://www.netlify.com/). You'll need to add your Agility CMS `AGILITY_GUID`, `AGILITY_API_KEY`, and `AGILITY_API_ISPREVIEW` variables in Netlify's **Site settings > Build & deploy > Environment** section.

## gatsby-config.js

You'll want to take a peek under the hood at some point and take the starter's configuration for Gatsby further. To get a better understanding of the `options`, please visit [GatsbyJS Source Plugin for Agility CMS](https://github.com/agility/gatsby-source-agilitycms) on GitHub for documentation.

<a name="what-is"></a>

# What is Agility CMS? What makes it different?

[Agility CMS](https://agilitycms.com/) is a headless Content Management System (CMS) that lets you define your custom content types, relationships and pages. This is called Content Architecture, and you can reuse this content for your websites and apps.

Agility believes that a successful website balances the **User Experience (UX)**, **Editor Experience (EX)**, and **Developer Experience (DX)**.

While Gatsby tends to handle **UX** and **DX** quite well, too often editors are an after-thought in Gatsby (and other JAMstack) websites. They feel constrained by not being able to manage their sitemap and what content is on which pages.

Agility aims to empower and improve the **Editor Experience** by providing built-in **Page Management**. This means developers can build UI Components and leave editors to compose their pages.

[Learn more about Agility CMS and Gatsby](https://help.agilitycms.com/hc/en-us/articles/360039879872)

<a name="resources"></a>

# Resources

## Agility CMS

- [Official site](https://agilitycms.com)
- [Documentation](https://help.agilitycms.com/hc/en-us)
- [Guides](https://agilitycms.com/resources)
- [Sourcing from Agility CMS](https://www.gatsbyjs.org/docs/sourcing-from-agilitycms/)
- [Help/Support](https://help.agilitycms.com/hc/en-us)

## GatsbyJS

- [Official site](https://www.gatsbyjs.org/)
- [Documentation](https://www.gatsbyjs.org/docs/)
- [GatsbyJS Source Plugin for Agility CMS](https://github.com/agility/gatsby-source-agilitycms)

## Prettier

- [Get started](https://prettier.io/docs/en/install.html)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Interactive demo](https://prettier.io/playground/)

## Community

- [Official Slack](https://join.slack.com/t/agilitycommunity/shared_invite/enQtNzI2NDc3MzU4Njc2LWI2OTNjZTI3ZGY1NWRiNTYzNmEyNmI0MGZlZTRkYzI3NmRjNzkxYmI5YTZjNTg2ZTk4NGUzNjg5NzY3OWViZGI)
- [Podcast](https://agilitycms.com/community/agileliving)
- [Blog](https://agilitycms.com/resources/posts)
- [GitHub](https://github.com/agility)
- [Forums](https://help.agilitycms.com/hc/en-us/community/topics)
- [Facebook](https://www.facebook.com/AgilityCMS/)
- [Twitter](https://twitter.com/AgilityCMS)

<a name="roadmap"></a>

# Roadmap

See the [open issues](https://github.com/agility/agility-gatsby-starter/issues) for a list of proposed features (and known issues).

<a name="code-of-conduct"></a>

# Code of conduct

See [CODE OF CONDUCT](CODE_OF_CONDUCT.md) for more information.

<a name="contributing"></a>

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Thank you to all of you who have [contributed to agility-gatsby-starter](https://github.com/agility/agility-gatsby-starter/graphs/contributors)!

## 🎉🤘💖🖖

<a name="license"></a>

# License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
