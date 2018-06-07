'use strict';

const core = {
        errors: require('./errors.js'),
    },
    BPromise = require('bluebird'),
    generateOpts = (alert, deepLink, ttl, sound, badge) => {
        const aps = JSON.stringify({
                aps: {alert, sound, badge, dl: deepLink},
            }),
            TTL = {DataType: 'Number', StringValue: String(ttl)};
        return {
            Message: JSON.stringify({
                default: '',
                APNS: aps,
                APNS_SANDBOX: aps,
                GCM: JSON.stringify({
                    data: {alert, sound, badge, dl: deepLink},
                }),
            }),
            MessageStructure: 'json',
            MessageAttributes: {
                'AWS.SNS.MOBILE.APNS.TTL': TTL,
                'AWS.SNS.MOBILE.APNS_SANDBOX.TTL': TTL,
                'AWS.SNS.MOBILE.GCM.TTL': TTL,
            },
        };
    };

module.exports = (
    self,
    {topic, endpoint, alert, deepLink, ttl = 60, sound = 'default', badge = 1}
) => new BPromise((res, rej) => {
    const opts = generateOpts(alert, deepLink, ttl, sound, badge);
    if (topic) opts.TopicArn = topic;
    else if (endpoint) opts.TargetArn = endpoint;
    self.sns.publish(opts)
        .promise()
        .then((data) => res(data))
        .catch((err) => rej(core.errors.internal(err)));
});

module.exports.multiple = (
    self,
    {endpoints, alert, deepLink, ttl = 60, sound = 'default', badge = 1}
) => {
    const opts = generateOpts(alert, deepLink, ttl, sound, badge);
    return BPromise.map(
        endpoints,
        endpoint => new BPromise((res) => {
            opts.TargetArn = endpoint;
            self.sns.publish(opts)
                .promise()
                .then((data) => res({data}))
                .catch((err) => res({err}));
        })
    );
};
