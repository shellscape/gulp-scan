'use strict';
/*jshint -W079 */
var expect = require('chai').expect,
	fs = require('fs'),
	gutil = require('gulp-util'),
	path = require('path'),
	scan = require('../index'),

	fixture = fs.readFileSync(path.join(__dirname, 'fixture.less'), 'utf-8'),
	file = new gutil.File({
		base: __dirname,
		path: __dirname + '/fixture.less',
		contents: new Buffer(fixture)
	});

describe('Scan Fn', function () {
	it('should scan using a string', function (done) {
		var stream = scan({ term: '@import', fn: function (match, matchedFile) {
				expect(match).to.equal('@import');
				expect(matchedFile.path).to.equal(file.path);
				expect(matchedFile.base).to.equal(file.base);
			}});

		stream.on('data', function (file) {});
		stream.on('end', done);

		stream.write(file);
		stream.end();
	});

	it('should scan using a RegExp', function (done) {
		var stream = scan({ term: /@import(.+)$/gm, fn: function (match, matchedFile) {
				expect(match).to.have.length.above(0);
				expect(match.indexOf('@import')).to.equal(0);
				expect(matchedFile.path).to.equal(file.path);
				expect(matchedFile.base).to.equal(file.base);
			}});

		stream.on('data', function (file) {});
		stream.on('end', done);

		stream.write(file);
		stream.end();
	});
});
