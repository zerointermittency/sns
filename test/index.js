'use strict';

const Mocha = require('mocha'),
    mocha = new Mocha({reporter: process.env.REPORTER || 'spec'}),
    Path = require('wrapper-path'),
    path = new Path(`${__dirname}/../`);

global._path = path;
global._expect = require('chai').expect;
global._assert = require('chai').assert;
global._stdout = require('test-console').stdout;
global._ZIDate = require('@zerointermittency/date');
global._ZISns = require('../ZISns.js');
global._config = require('./config.js');

path.recursive
    .files('/test/', {exclude: /(test\/index\.js|\.gitignore|\.jpeg)$/i})
    .forEach((file) => mocha.addFile(file));

mocha.run(() => process.exit());
