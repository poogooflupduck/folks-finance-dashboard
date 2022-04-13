# Folks Finance Dashboard

### Live Demo: https://folks-finance-dashboard.vercel.app/

Explore Folks Finance Testnet metrics

## Technologies

Folks Finance Dashboard uses:

- [Next.js](https://nextjs.org/)
- [Folks Finance JS SDK](https://github.com/Folks-Finance/folks-finance-js-sdk/)
- Continuous data-fetching using [SWR](https://swr.vercel.app/)
- A responsive, mobile-friendly UI custom-built using [Chakra UI](https://chakra-ui.com/)

## Dashboard API

The dashboard calculates key metrics using the Folks Finance JS SDK and then exposes these metrics via API endpoints. Anyone can use these endpoints to obtain key metrics and data. If key metrics are directly added to the JS SDK then some of these endpoints may no longer be required, however, for the time being they may provide useful aggregated data to devs.

#### Endpoints:

[`/api/tvl`](https://folks-finance-dashboard.vercel.app/api/tvl)

[`/api/allPools`](https://folks-finance-dashboard.vercel.app/api/allPools)

[`/api/allPairs`](https://folks-finance-dashboard.vercel.app/api/allPairs)

[`/api/borrowersCount`](https://folks-finance-dashboard.vercel.app/api/borrowersCount)

[`/api/loanCount`](https://folks-finance-dashboard.vercel.app/api/loanCount)

[`/api/rewardsValue`](https://folks-finance-dashboard.vercel.app/api/rewardsValue) (Testnet Rewards Aggregator limits don't seem to be configured on the JS SDK currently)

## Folks Finance JS SDK

The dashboard uses the Folks Finance JS SDK. No manual configuration is required to deploy the project (see the deploy button below). However, devs and the Folks Finance team should take the following into account:

- The folks-finance-js-sdk module is transpiled using [next-transpile-modules](https://www.npmjs.com/package/next-transpile-modules)
- A temporary minor patch has been applied to allow use of the JS SDK with Next.js, in the file: `node_modules/folks-finance-js-sdk/src/v1/lend/constants.ts` via `npx patch-package` (see `patches` folder). The patch exports each of the constants directly instead of exporting them all at the end of the file to prevent a [Babel isolatedModules error](https://github.com/vercel/next.js/issues/7882). The patch is applied automatically using a postinstall script (see `package.json`).

## Local development

Clone, run `yarn install` or `npm install` and then start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

The easiest way to deploy Folks Finance Dashboard is via Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkarlxlee%2Ffolks-finance-dashboard%2F)
