'use strict';

describe('ZISns', () => {
    const sns = new _ZISns(_config.sns, _config.platform);
    // require('./endpoint')(sns);
    // require('./topic')(sns);

    it('send android', function(done) {
        this.timeout(5000);
        const snsModoFutbol = new _ZISns(_config.sns, _config.platform);
        snsModoFutbol.send({
            endpoint: _config.endpoint,
            alert: {
                title: '🏀 Canasta!',
                body: '3 puntos',
            },
            deepLink: 'modofutboldl://modofutboldl',
            // badge: 2,
        })
            .then((data) => {
                console.log('#data', require('util').inspect(data, 0, 10, 1));
                _expect(data.MessageId).to.exist;
                done();
            })
            .catch((err) => {
                console.log('#err', require('util').inspect(err, 0, 10, 1));
                done(err);
            });
    });


    it.only('send multiple', function(done) {
        this.timeout(5000);
        const snsModoFutbol = new _ZISns(_config.sns, _config.platform);
        snsModoFutbol.sendMultiple({
            endpoints: [
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
                'arn:aws:sns:us-east-1:829011433133:endpoint/APNS/ModoFutboliOS/e688a6f4-d63a-3b06-a066-8b1d4609805d',
            ],
            alert: {
                title: '🏀 Canasta!',
                body: '3 puntos',
            },
            deepLink: 'modofutboldl://modofutboldl',
            // badge: 2,
        })
            .then((data) => {
                console.log('#data', require('util').inspect(data, 0, 10, 1));
                // _expect(data.MessageId).to.exist;
                done();
            })
            .catch((err) => {
                console.log('#err', require('util').inspect(err, 0, 10, 1));
                done(err);
            });
    });

    // it.skip('send', function(done) {
    //     this.timeout(5000);
    //     const snsModoFutbol = new _ZISns(_config.sns, _config.platform);
    //     let topicArn;

    //     sns.topic.create('testSend')
    //         .then((arn) => {
    //             _expect(arn).to.be.string;
    //             topicArn = arn;
    //             return Promise.resolve();
    //         })
    //         .then(() => snsModoFutbol.topic.subscribe(topicArn, _config.endpoint))
    //         .then(() => snsModoFutbol.send({
    //             topic: topicArn,
    //             alert: {
    //                 title: '🏀 Canasta!',
    //                 body: '2 puntos',
    //             },
    //             deepLink: 'modofutboldl://modofutboldl',
    //             // badge: 2,
    //         }))
    //         .then((data) => {
    //             _expect(data.MessageId).to.exist;
    //             // console.log('#data', require('util').inspect(data, false, 5, true));
    //             return Promise.resolve();
    //         })
    //         .then(() => snsModoFutbol.send({
    //             endpoint: _config._endpoint,
    //             alert: {
    //                 title: '🏀 Canasta!',
    //                 body: '3 puntos',
    //             },
    //             deepLink: 'modofutboldl://modofutboldl',
    //             // badge: 2,
    //         }))
    //         .then((data) => {
    //             // console.log('#data', require('util').inspect(data, false, 5, true));
    //             _expect(data.MessageId).to.exist;
    //             return Promise.resolve();
    //         })
    //         .then(() => sns.topic.delete(topicArn))
    //         .then(() => done())
    //         // .catch(done);
    //         .catch((err) => {
    //             // console.log('#err', require('util').inspect(err, 0, 10, 1));
    //             done();
    //         });
    // });
});