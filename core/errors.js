'use strict';

const NError = require('@zerointermittency/error');

class SnsError extends NError {

    constructor(opts) {
        opts.prefix = 'zi-sns';
        super(opts);
    }

}

module.exports = {
    internal: (extra) => new SnsError({
        code: 100,
        name: 'internal',
        message: 'Internal error',
        level: NError.level.fatal,
        extra: extra,
    }),
    alreadyExist: (extra) => new SnsError({
        code: 101,
        name: 'alreadyExist',
        message: 'Already exist',
        level: NError.level.warning,
        extra: extra,
    }),
    notFound: (extra) => new SnsError({
        code: 102,
        name: 'notFound',
        message: 'Not found',
        level: NError.level.warning,
        extra: extra,
    }),
};