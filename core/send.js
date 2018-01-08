'use strict';

const core = {
    errors: require('./errors.js'),
};

module.exports = (
    self,
    {topic, endpoint, alert, deepLink, ttl = 60, sound = 'default', badge = 1}
) => new Promise((res, rej) => {
    let aps = JSON.stringify({
            aps: {alert, sound, badge, dl: deepLink},
        }),
        TTL = {DataType: 'Number', StringValue: String(ttl)},
        opts = {
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
    if (topic) opts.TopicArn = topic;
    else if (endpoint) opts.TargetArn = endpoint;
    self.sns.publish(opts, (err, data) => {
        /* istanbul ignore if */
        if (err) return rej(core.errors.internal(err));
        res(data);
    });
});