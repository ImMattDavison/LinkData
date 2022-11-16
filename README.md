# LinkData

Return details about a link, unshorten short links, check status codes, and view more about the link and it's destination.

## Install

```$ npm install linkdata```

## How it works

```js
const linkdata = require('linkdata');

let url = 'https://bit.ly/3Gl9L7V' // or any other link

let result = linkdata(url, function (err, response) {
    console.log(response);
});
```

## Sample response

```json 
{
  inputUrl: 'https://bit.ly/3Gl9L7V',
  inputHost: 'bit.ly',
  inputPath: '/3Gl9L7V',
  inputProtocol: 'https:',
  inputPort: null,
  outputUrl: 'https://github.com/ImMattDavison/linkdata',
  outputHost: 'github.com',
  outputPath: '/ImMattDavison/linkdata',
  outputProtocol: 'https:',
  outputPort: null,
  domainInfo: {
    originDomain: 'bit.ly',
    originUrl: 'https://bit.ly/3Gl9L7V',
    destinationDomain: 'github.com',
    destinationUrl: 'https://github.com/ImMattDavison/linkdata',
    statusCode: 404,
    statusMessage: 'Not Found'
  },
  redirectStatus: {
    wasRedirected: true,
    directedTo: 'https://github.com/ImMattDavison/linkdata',
    directedFrom: 'https://bit.ly/3Gl9L7V',
    destinationProtocol: 'https:',
    statusCode: 404,
    statusMessage: 'Not Found'
  }
}
```