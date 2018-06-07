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

    send(...args) {
        return core.send(this, ...args);
    }

    sendMultiple(...args) {
        return core.send.multiple(this, ...args);
    }

    get endpoint() {
        return core.endpoint(this);
    }

    get topic() {
        return core.topic(this);
    }

}

module.exports = ZISns;