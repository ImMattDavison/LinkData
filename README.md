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