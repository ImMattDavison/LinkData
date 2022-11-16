const request = require('request');
const nodeUrl = require('node:url');

let wasRedirected = false;

function checkUrl(url) {
    // IF URL DOES NOT HAVE DEFINED PROTOCOL, ADD HTTPS
    if (!url.startsWith('http')) url = 'https://' + url;

    // MAKE REQUEST TO URL
    request.head(
        {
        url: url,
        headers: {
            'User-Agent': 'request',
        },
        },
        function (err, r, body) {
        if (err) {
            return callback(err);
        }

        let location = r.request.href || url;
        let statusCode = r.statusCode;
        
        // DECLARE NODE URLS
        let link = new URL(url)
        let dest = new URL(location)

        if (!url.match(location)) wasRedirected = true;
        return (
            {
                url: url,
                statusCode: statusCode,
                redirectStatus: {
                    wasRedirected: wasRedirected,
                    directedTo: location,
                },
                domainInfo: {
                    originDomain: link.host,
                    originUrl: url,
                    destinationDomain: dest.host,
                    destinationUrl: location,
                },
            }
        );
    });
}

module.exports = checkUrl(url);