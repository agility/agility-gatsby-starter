# Gatsby + Agility CMS Starter

This repo shows how you can use GatsbyJS with Agility CMS.

This site uses the [Agility CMS Gatsby Source Plugin](https://github.com/agility/gatsby-source-agilitycms).

This is currently a work in-progress. Please see _Issues_ for a list of features that need to be implemented.

## Getting Started

Install the Gatsby CLI

```
npm install -g gatsby-cli
```

Resolve any dependencies

```
npm install
```

Rename `./.env.development.example` to `./.env.development`

```
cp .env.development.example .env.development
```

Update your development variables in `.env.development`

```
AGILITY_GUID=''
AGILITY_API_KEY='' # use your Preview API key; it starts with `defaultpreview`
```

Rename `./.env.production.example` to `./.env.production`

```
cp .env.production.example .env.production
```

Update your production variables in `.env.production`

```
AGILITY_GUID=''
AGILITY_API_KEY='' # use your Live API key. it starts with `defaultlive`
```

Start the Gatsby Developer Server

```
npm start
```

Create a production build

```
npm run build
```

Serve the production build locally.

```
npm run serve
```

Format code

```
npm run format
```
