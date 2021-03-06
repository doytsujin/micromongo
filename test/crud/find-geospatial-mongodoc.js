/**
 * Created by alykoshin on 23.03.16.
 */

'use strict';

/* globals describe, before, beforeEach, after, it */

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var sinon = require('sinon');

var crud = require('../../lib/crud/');


describe('#Bitwise Query Operators - mongo docs', function() {

	describe('#Query Selectors', function() {

		it('#$geoWithin');

		it('#$geoIntersects');

		it('#$near');

		it('#$nearSphere');

	});


	describe('#Geometry Specifiers¶', function() {

		it('#$geometry');

		it('#$minDistance');

		it('#$maxDistance');

		it('#$center');

		it('#$centerSphere');

		it('#$box');

		it('#$polygon');

		it('#$uniqueDocs');

	});


});
