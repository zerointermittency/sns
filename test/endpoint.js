'use strict';

module.exports = (sns) => {
    describe('endpoint', () => {
        it('success: create', function(done) {
            this.timeout(4000);
            let targetArn;
            sns.endpoint.create({
                platform: 'ios',
                token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                data: {foo: 'bar'},
            })
                .then((arn) => {
                    // console.log('#data', require('util').inspect(arn, false, 5, true));
                    _expect(arn).to.be.string;
                    targetArn = arn;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.delete(targetArn))
                .then(() => done())
                .catch(done);
        });
        it('catch: create already exists with the same Token, but different attributes', function(done) {
            this.timeout(4000);
            let targetArn;
            sns.endpoint.create({
                platform: 'ios',
                token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                data: {foo: 'bar'},
            })
                .then((arn) => {
                    // console.log('#data', require('util').inspect(arn, false, 5, true));
                    _expect(arn).to.be.string;
                    targetArn = arn;
                    return sns.endpoint.create({
                        platform: 'ios',
                        token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                        // data: JSON.stringify({foo: 'bar'}),
                    });
                })
                .catch((err) => {
                    // console.log('#err', require('util').inspect(err, false, 5, true));
                    _assert(err.code, 101);
                    _assert(err.name, 'alreadyExist');
                    _assert(err.level, 'warning');
                    sns.endpoint.delete(targetArn)
                        .then(() => done())
                        .catch(done);
                });
        });
        it('read', function(done) {
            this.timeout(4000);
            let targetArn;
            sns.endpoint.create({
                platform: 'ios',
                token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                data: {foo: 'bar'},
            })
                .then((arn) => {
                    // console.log('#data', require('util').inspect(arn, false, 5, true));
                    _expect(arn).to.be.string;
                    targetArn = arn;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.read(targetArn))
                .then((data) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(data.enabled).to.exist;
                    _expect(data.token).to.exist;
                    _expect(data.data).to.exist;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.delete(targetArn))
                .then(() => sns.endpoint.read(targetArn))
                .catch((err) => {
                    _expect(err.code).to.equal(100);
                    _expect(err.name).to.equal('internal');
                    done();
                });
        });
        it('update', function(done) {
            this.timeout(4000);
            let targetArn;
            sns.endpoint.create({
                platform: 'ios',
                token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                data: {foo: 'bar'},
            })
                .then((arn) => {
                    // console.log('#data', require('util').inspect(arn, false, 5, true));
                    _expect(arn).to.be.string;
                    targetArn = arn;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.update(
                    targetArn,
                    {
                        enabled: false,
                        token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                        data: {foo: 'bar'},
                    }
                ))
                .then((data) => {
                    _expect(data.ResponseMetadata).to.exist;
                    return sns.endpoint.read(targetArn);
                })
                .then((data) => {
                    // console.log('#data', require('util').inspect(data, false, 5, true));
                    _expect(data.enabled).to.exist;
                    _expect(data.enabled).to.equal(false);
                    _expect(data.token).to.exist;
                    _expect(data.data).to.exist;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.delete(targetArn))
                .then(() => sns.endpoint.update('asdf', {enabled: false}))
                .catch((err) => {
                    _expect(err.code).to.equal(100);
                    _expect(err.name).to.equal('internal');
                    done();
                });
        });
        it('delete', function(done) {
            this.timeout(4000);
            let targetArn;
            sns.endpoint.create({
                platform: 'ios',
                token: '14a9b801b50e7c3007fc36afa3443e51ba0f4f5e8cf36a087289209c64d82aaa',
                data: {foo: 'bar'},
            })
                .then((arn) => {
                    // console.log('#data', require('util').inspect(arn, false, 5, true));
                    _expect(arn).to.be.string;
                    targetArn = arn;
                    return Promise.resolve();
                })
                .then(() => sns.endpoint.delete(targetArn))
                .then(() => sns.endpoint.delete('asdf'))
                .catch((err) => {
                    _expect(err.code).to.equal(100);
                    _expect(err.name).to.equal('internal');
                    done();
                });
        });
    });
};