# LinkData

Return details about a link, unshorten short links, check status codes, and view more about the link and it's destination.

## Install

```
$ npm install linkdata
```

## How to use it

```js
const linkdata = require('linkdata');

let url = 'https://bit.ly/3X9Oa86' // or any other link

let result = linkdata(url, function (err, response) {
    console.log(response);
});
```

## Sample response

```
{
  inputUrl: 'https://bit.ly/3X9Oa86',
  inputHost: 'bit.ly',
  inputPath: '/3X9Oa86',
  inputProtocol: 'https:',
  inputPort: null,
  outputUrl: 'https://matt.lgbt/',
  outputHost: 'matt.lgbt',
  outputPath: '/',
  outputProtocol: 'https:',
  outputPort: null,
  domainInfo: {
    originDomain: 'bit.ly',
    originUrl: 'https://bit.ly/3X9Oa86',
    destinationDomain: 'matt.lgbt',
    destinationUrl: 'https://matt.lgbt/'
  },
  redirectStatus: {
    wasRedirected: true,
    directedTo: 'https://matt.lgbt/',
    directedFrom: 'https://bit.ly/3X9Oa86',
    destinationProtocol: 'https:',
    destinationStatusCode: 200,
    destinationStatusMessage: 'OK'
  }
}
```