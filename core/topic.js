'use strict';

const core = {
    errors: require('./errors.js'),
};

module.exports = (self) => {
    const notFoundOrInternal = (err) => {
        let reg = /Topic does not exist/i;
        if (err && reg.test(err.message))
            return core.errors.notFound(err);
        return core.errors.internal(err);
    };
    return {
        create: (name) => new Promise((res, rej) => {
            self.sns.createTopic({Name: name}, (err, result) => {
                /* istanbul ignore if */
                if (err) return rej(core.errors.internal(err));
                res(result.TopicArn);
            });
        }),
        read: (arn) => new Promise((res, rej) => {
            self.sns.getTopicAttributes({TopicArn: arn}, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res({
                    displayName: result.Attributes.DisplayName,
                    pending: Number(result.Attributes.SubscriptionsPending),
                    confirmed: Number(result.Attributes.SubscriptionsConfirmed),
                    deleted: Number(result.Attributes.SubscriptionsDeleted),
                });
            });
        }),
        update: (arn, displayName) => new Promise((res, rej) => {
            self.sns.setTopicAttributes({
                AttributeName: 'DisplayName',
                TopicArn: arn,
                AttributeValue: displayName,
            }, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result);
            });
        }),
        delete: (arn) => new Promise((res, rej) => {
            self.sns.deleteTopic({TopicArn: arn}, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result);
            });
        }),
        subscribe: (topic, endpoint, protocol = 'application') => new Promise((res, rej) => {
            self.sns.subscribe({
                TopicArn: topic, Endpoint: endpoint, Protocol: protocol,
            }, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result.SubscriptionArn);
            });
        }),
        unsubscribe: (subscriptionArn) => new Promise((res, rej) => {
            self.sns.unsubscribe({SubscriptionArn: subscriptionArn}, (err, result) => {
                if (err) return rej(notFoundOrInternal(err));
                res(result);
            });
        }),
    };
};