var jshint = require('gulp-jshint'),
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  path = require('path'),
  stylish = require('jshint-stylish'),

  glob = [ path.join(__dirname, '/*.js'), path.join(__dirname, 'specs/*.js') ];

gulp.task('jshint', function () {
  return gulp.src(glob)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint'], function () {
  return gulp.src(glob)
    .pipe(mocha({ui: 'bdd', reporter: 'nyan'}));
});
