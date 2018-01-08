'use strict';

describe('ZISns', () => {
    const sns = new _ZISns(_config.sns, _config.platform);
    require('./endpoint')(sns);
    require('./topic')(sns);

    it('send', function(done) {
        this.timeout(5000);
        const snsModoFutbol = new _ZISns(_config.sns, _config.platform);
        let topicArn;

        sns.topic.create('testSend')
            .then((arn) => {
                _expect(arn).to.be.string;
                topicArn = arn;
                return Promise.resolve();
            })
            .then(() => snsModoFutbol.topic.subscribe(topicArn, _config.endpoint))
            .then(() => snsModoFutbol.send({
                topic: topicArn,
                alert: {
                    title: '🏀 Canasta!',
                    body: '2 puntos',
                },
                deepLink: 'modofutboldl://modofutboldl',
                // badge: 2,
            }))
            .then((data) => {
                _expect(data.MessageId).to.exist;
                // console.log('#data', require('util').inspect(data, false, 5, true));
                return Promise.resolve();
            })
            .then(() => snsModoFutbol.send({
                endpoint: _config._endpoint,
                alert: {
                    title: '🏀 Canasta!',
                    body: '3 puntos',
                },
                deepLink: 'modofutboldl://modofutboldl',
                // badge: 2,
            }))
            .then((data) => {
                // console.log('#data', require('util').inspect(data, false, 5, true));
                _expect(data.MessageId).to.exist;
                return Promise.resolve();
            })
            .then(() => sns.topic.delete(topicArn))
            .then(() => done())
            // .catch(done);
            .catch((err) => {
                // console.log('#err', require('util').inspect(err, 0, 10, 1));
                done();
            });
    });
});