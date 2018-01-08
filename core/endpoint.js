'use strict';

const core = {
    errors: require('./errors.js'),
};

module.exports = (self) => {
    const notFoundOrInternal = (err) => {
        let reg = /Reason: Endpoint (.+) already exists with the same Token, but different attributes/i;
        if (err && reg.test(err.message))
            return core.errors.notFound(err);
        return core.errors.internal(err);
    };
    return {
        create: ({platform, token, data}) => new Promise((res, rej) => {
            self.sns.createPlatformEndpoint({
                PlatformApplicationArn: self.platforms[platform],
                Token: token,
                CustomUserData: JSON.stringify(data),
            }, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result.EndpointArn);
            });
        }),
        read: (arn) => new Promise((res, rej) => {
            self.sns.getEndpointAttributes({EndpointArn: arn}, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res({
                    enabled: (result.Attributes.Enabled === 'true') ? true : false,
                    token: result.Attributes.Token,
                    data: JSON.parse(result.Attributes.CustomUserData),
                });
            });
        }),
        update: (arn, {enabled, token, data}) => new Promise((res, rej) => {
            const attrs = {};
            if (typeof enabled !== undefined)
                attrs.Enabled = (enabled) ? 'true' : 'false';
            if (token) attrs.Token = token;
            if (data) attrs.CustomUserData = JSON.stringify(data);
            self.sns.setEndpointAttributes({
                EndpointArn: arn, Attributes: attrs,
            }, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result);
            });
        }),
        delete: (arn) => new Promise((res, rej) => {
            self.sns.deleteEndpoint({EndpointArn: arn}, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result);
            });
        }),
    };
};