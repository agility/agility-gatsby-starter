<p align="center">
  <a href="https://gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" height="60" />
    <img alt="Gatsby" src="https://static.agilitycms.com/layout/img/logo-original.svg" width="200" />
  </a>
</p>
<h1 align="center">
  Gatsby + Agility CMS Starter
</h1>

<a href="https://github.com/agility/agility-gatsby-starter/blob/master/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="This repo is released under the MIT license." />
</a>

This repo is a great starting point to get a Gatsby project up and running quickly with Agility CMS as the Content Management System.

This site uses the [Agility CMS Gatsby Source Plugin](https://github.com/agility/gatsby-source-agilitycms) and it meant to be used with the **Blog Template** in Agility CMS

This is currently a work in-progress. Please see _Issues_ for a list of features that need to be implemented.

## Getting up and running

### 1. Pre-requisite: Install the Gatsby CLI

```
npm install -g gatsby-cli
```

[Additional information for getting started with Gatsby](https://www.gatsbyjs.org/tutorial/)

### 2. Pre-requisite: Get a free Agility CMS account

Navigate to [https://account.agilitycms.com/sign-up?product=agility-free](https://account.agilitycms.com/sign-up?product=agility-free).

Fill out the form and ensure you select `JavaScript` as your Development Stack.

On step 2, give your project a name and ensure to select `Blog Template` as your template.

### 3. Save your Agility CMS credentials

After going through the sign up process, you'll come to your Agility CMS `Getting Started` screen which has **Content Fetch API Details**. Save your `GUID` and then click the **Show API Key(s)** button to reveal your `Live API Key` and `Preview API Key`. Click the **Show** buttons beside both to unmask the credentials and copy these somewhere temporarily, or refer back to this screen when you begin to [Configure your local environment](#6.-configure-your-local-environment).

### 4. Clone this repo to your local machine

```
git clone https://github.com/agility/agility-gatsby-starter
```

### 5. Install Node dependencies

With [Yarn](https://yarnpkg.com/en/docs/install)

```
cd agility-gatsby-starter
yarn
```

With [NPM](https://www.npmjs.com/get-npm)

```
cd agility-gatsby-starter
npm install
```

### 6. Configure your local environment

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

### 7. Start the Gatsby Developer Server

With [Yarn](https://yarnpkg.com/en/docs/install)

```
yarn start
```

With [NPM](https://www.npmjs.com/get-npm)

```
npm start
```

## How to build a production version of your project and test it

It's good practice to build a production version and test it locally before publishing it or doing a pull request into `master`. Here's how to do it:

With [Yarn](https://yarnpkg.com/en/docs/install)

```
yarn build
yarn serve
```

With [NPM](https://www.npmjs.com/get-npm)

```
npm run build
npm run serve
```

## How to format all project code with Prettier

If you care about code formatting and keeping it consistent across your projects and/or among your team, you can utilize an opinionated code formatter like [Prettier](https://prettier.io/). This repo contains a `./.prettierrc` file which you can modify to suit your formatting tastes/needs.

With [Yarn](https://yarnpkg.com/en/docs/install)

```
yarn format
```

With [NPM](https://www.npmjs.com/get-npm)

```
npm run format
```
