const request = require('request');
const nodeUrl = require('url');

let wasRedirected = false;

module.exports = function (url, callback) {
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
        let link = nodeUrl.parse(url, true)
        let dest = nodeUrl.parse(location, true)

        if (!url.match(location)) wasRedirected = true;

        // RETURN DATA
        return callback(null,
            {
                alldata: r,
                url: url,
                statusCode: statusCode,
                redirectStatus: {
                    wasRedirected: wasRedirected,
                    directedTo: location,
                    destinationProtocol: dest.protocol,
                    statusCode: statusCode,
                    statusMessage: r.statusMessage,
                },
                domainInfo: {
                    originDomain: link.host,
                    originUrl: url,
                    destinationDomain: dest.host,
                    destinationUrl: location,
                    statusMessage: r.statusMessage,
                },
            }
        );
    });
};