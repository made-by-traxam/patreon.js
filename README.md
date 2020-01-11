# patreon.js
`patreon.js` is an NPM JS package that makes interacting with the
[Patreon ReST API](https://docs.patreon.com/) as easy as pie.

## Features
- [documented](https://www.npmjs.com/package/patreon.js) data models and api
- asynchronous
- [TypeScript](https://www.typescriptlang.org/)-powered

## Getting started
First of all, install the `patreon.js` package via NPM:
```bash
npm install patreon.js
```

If you already have a an **access token** for the Patreon API, you will most
likely want to start with creating a
[PatreonAPI](https://trax.am/docs/patreon.js/latest/classes/patreonapi.html#constructor)
instance like this:
```js
const Patreon = require('patreon.js');

 // replace xxx with your access token or load it from a configuration
const api = new Patreon.PatreonAPI('xxx');
```

You can then use the PatreonAPI instance to make requests to the Patreon API.

For example, you can fetch the current user and print his name to the console
like this:
```js
api.getCurrentUser()
  .then(user => {
    console.log(user.firstName + ' ' + user.lastName);
  })
  .catch(console.error);
```

Some data models offer further requests to simplify request chaining. For
example, you might want to print all pledge id's of the user's first
[Campaign](https://trax.am/docs/patreon.js/latest/classes/campaign.html#getallpledges)
to the console:
```js
api.getCurrentUserCampaigns()
  .then(campaigns => campaigns[0].getAllPledges()) // request-chain
  .then(pledges => {
    let pledgeIds = pledges.map(pledge => pledge.patron.id);
    console.log(pledgeIds);
  })
  .catch(console.error);
```

Some requests like the
[`PatreonAPI.getCampaignPledges(campaignId)`](https://trax.am/docs/patreon.js/latest/classes/patreonapi.html#getcampaignpledges)
are paginated. That means that you will get the data out of it in bunches:
```js
api.getCampaignPledges('campaignId')
  .then(page => {
    console.log(page.contents); // page.contents contains an array of pledges
    if (page.hasNext()) { // check whether there is a next page
      page.getNext() // fetch the next page
        .then(nextPage => {
          // do something with the second page...
        })
        .catch(console.error);
    }
  })
  .catch(console.error);
```

## Useful links
- [Documentation](https://trax.am/docs/patreon.js/latest/)
- [Repository](https://gitlab.com/traxam/patreon.js)
- [NPM package](https://www.npmjs.com/package/patreon.js)

## License
This project is released under the
[MIT license](https://opensource.org/licenses/MIT). A copy of the license is
included in the `LICENSE` file in this package.
