'use strict';

module.exports = (sns) => {
    describe.skip('topic', () => {
        it('create', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testCreate')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => done())
                .catch(done);
        });
        it('read', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testRead')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    return Promise.resolve();
                })
                .then(() => sns.topic.read(arn))
                .then((data) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(data.displayName).to.exist;
                    _expect(data.pending).to.exist;
                    _expect(data.confirmed).to.exist;
                    _expect(data.deleted).to.exist;
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => sns.topic.read(arn))
                .catch((err) => {
                    _expect(err.code).to.equal(102);
                    _expect(err.name).to.equal('notFound');
                    done();
                });
        });
        it('update', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testUpdate')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    return Promise.resolve();
                })
                .then(() => sns.topic.update(arn, 'bar'))
                .then(() => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    return Promise.resolve();
                })
                .then(() => sns.topic.read(arn))
                .then((data) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(data.displayName).to.be.equal('bar');
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => sns.topic.update(arn, 'bar'))
                .catch((err) => {
                    _expect(err.code).to.equal(102);
                    _expect(err.name).to.equal('notFound');
                    done();
                });
        });
        it('delete', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testDelete')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    // console.log('#arn', require('util').inspect(arn, 0, 10, 1));
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => sns.topic.delete('arn:aws:sns:us-east-1:'))
                .catch((err) => {
                    _expect(err.code).to.equal(100);
                    _expect(err.name).to.equal('internal');
                    done();
                });
        });
        it('subscribe', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testSubcribe')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    return Promise.resolve();
                })
                .then(() => sns.topic.subscribe(arn, _config.endpoint))
                .then((SubscriptionArn) => {
                    _expect(SubscriptionArn).to.be.string;
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => sns.topic.subscribe(arn, _config.endpoint))
                .catch((err) => {
                    _expect(err.code).to.equal(102);
                    _expect(err.name).to.equal('notFound');
                    done();
                });
        });
        it('unsubscribe', function(done) {
            this.timeout(6000);
            let arn;
            sns.topic.create('testUnsubcribe')
                .then((topicArn) => {
                    _expect(topicArn).to.be.string;
                    arn = topicArn;
                    return Promise.resolve();
                })
                .then(() => sns.topic.subscribe(arn, _config.endpoint))
                .then((SubscriptionArn) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(SubscriptionArn).to.be.string;
                    return sns.topic.unsubscribe(SubscriptionArn);
                })
                .then((data) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(data.ResponseMetadata).to.exist;
                    return Promise.resolve();
                })
                .then(() => sns.topic.delete(arn))
                .then(() => sns.topic.unsubscribe('arn:aws:sns:us-east-1:'))
                .catch((err) => {
                    _expect(err.code).to.equal(100);
                    _expect(err.name).to.equal('internal');
                    done();
                });
        });
    });
};