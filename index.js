const request = require('request');
const nodeUrl = require('url');

let wasRedirected = false;

module.exports = function (url, callback) {
    // CHECK IF URL IS VALID
    if (!url.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig)) {
        callback(null, 'Invalid URL ' + url);
        return;
    };

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
                inputUrl: url,
                inputHost: link.host,
                inputPath: link.pathname,
                inputProtocol: link.protocol,
                inputPort: link.port,
                outputUrl: location,
                outputHost: dest.host,
                outputPath: dest.pathname,
                outputProtocol: dest.protocol,
                outputPort: dest.port,
                domainInfo: {
                    originDomain: link.host,
                    originUrl: url,
                    destinationDomain: dest.host,
                    destinationUrl: location,
                    statusCode: statusCode,
                    statusMessage: r.statusMessage,
                },
                redirectStatus: {
                    wasRedirected: wasRedirected,
                    directedTo: location,
                    directedFrom: url,
                    destinationProtocol: dest.protocol,
                    statusCode: statusCode,
                    statusMessage: r.statusMessage,
                },
            }
        );
    });
};