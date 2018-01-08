'use strict';

const SNS = require('aws-sdk/clients/sns'),
    core = {
        send: require('./core/send.js'),
        endpoint: require('./core/endpoint.js'),
        topic: require('./core/topic.js'),
    };

class ZISns {

    constructor(sns, platforms) {
        this.platforms = platforms;
        this.sns = new SNS(sns);
    }

    send({topic, endpoint, alert, deepLink, ttl, sound, badge}) {
        return core.send(this, {topic, endpoint, alert, deepLink, ttl, sound, badge});
    }

    get endpoint() {
        return core.endpoint(this);
    }

    get topic() {
        return core.topic(this);
    }

}

module.exports = ZISns;