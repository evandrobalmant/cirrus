'use strict';
module.exports = {
    originRequest: function (event, context, callback) {
        var request = event.Records[0].cf.request;
        var olduri = request.uri;
        var endslashuri = olduri.replace(/(\/[\w\-]+)$/, '$1/');

        if (endslashuri != olduri) {
            // Appending querystring
            var params = '';
            if (('querystring' in request) && (request.querystring.length > 0)) {
                params = '?' + request.querystring;
            }
            var newuri = endslashuri + params;

            const response = {
                status: '301',
                statusDescription: 'Moved Permanently',
                headers: {
                    location: [{
                        key: 'Location',
                        value: newuri
                    }]
                }
            };
            return callback(null, response);
        } else {
            // Return to CloudFront
            return callback(null, request);
        }
    }
};
