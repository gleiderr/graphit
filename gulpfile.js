const jasmineBrowser = require('gulp-jasmine-browser');
const gulp = require('gulp');

gulp.task('jasmine', function() {
  return gulp.src(['src/**/*.js', 'spec/**/*_spec.js'])
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({ port: 8888 }));
});