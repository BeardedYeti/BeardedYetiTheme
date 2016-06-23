var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	gutil = require('gulp-util')
	livereload = require('gulp-livereload'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	include = require('gulp-include'),
	sass = require('gulp-sass');


gulp.task('default', function() {
	console.log('Gulp is active! Welcome back Sir!')

});

var onError = function(err) {
	console.log('Error Occurred', err.message);
	this.emit('end');
};

gulp.task('jshint', function() {
      return gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scss', function() {
  return gulp.src('./scss/style.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(gulp.dest('.'))
    .pipe(minifycss() )
    .pipe(rename( { suffix: '.min' } ) )
    .pipe(gulp.dest('.'))
    .pipe(livereload());
} );

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./sass/**/*.scss', ['scss']);
	gulp.watch('./**/*.php').on('change', function(file) {
		livereload.changed(file);
	});
});