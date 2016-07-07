'use strict';

var gulp = require('gulp'),
	browserify = require('browserify'), // Bundles JS files
	sass = require('gulp-sass'), // Compiles sass/scss files to css
	babelify = require('babelify'), // Used to convert ES6 & JSX to ES5
	watch = require('gulp-watch'),
	plumber = require('gulp-plumber'), // Prevents piping streams from breaking
	gutil = require('gulp-util'), // Provides gulp utilities, including logging and beep
	minifycss = require('gulp-clean-css'), // Minifies CSS
	jshint = require('gulp-jshint'), // Lints JS
	stylish = require('jshint-stylish'), // Stylizes jshint linting
	uglify = require('gulp-uglify'), // Minifies JS
	autoprefixer = require('gulp-autoprefixer'), // Autoprefixes for supported browsers
	notify = require('gulp-notify'), // Provides notification to both the console
	sourcemaps = require('gulp-sourcemaps'), // Provide external sourcemap files
	source = require('vinyl-source-stream'),
	streamify = require('gulp-streamify'),
    buffer = require('vinyl-buffer'),
//Path Sources

	input = {
      'sass': 'sass/**/*.scss',
      'styleSass': 'sass/style.scss',
      'ecmascript': 'es6/**/*.js',
      'javascript': 'es6/app.js'
    },
    output = {
      'css': './',
      'javascript': 'js',
      'maps': 'maps'
    };

gulp.task('default', function() {
	console.log('Gulp is active! Welcome back Sir!')

});

var onError = function(err) {
	console.log('Error Occurred', err.message);
	this.emit('end');
};

//CSS
	//From Folder
	//Plumber
	//sourcemaps
	//compile scss to css
	//autoprefix
	//minify
	//sourcemaps
	//To Folder
	//Notify

	gulp.task('build-css', function() {
    	return gulp.src(input.styleSass)
    		.pipe(plumber({ errorHandler: onError }))
    		.pipe(sourcemaps.init())
      		.pipe(sass().on('error', sass.logError))
    		.pipe(sourcemaps.write())
    		.pipe(autoprefixer())
      		.pipe(minifycss())
    		.pipe(gulp.dest(output.css))
    		.pipe(notify('SASS/SCSS compiled into CSS, autoprefixed, and minified'));
    });

//JS
	//Browserify From Folder
	//Plumber
	//Babelify
	//Lint +stylish
	//Bundle
	//source bundle.js
	//Vinyl Buffer
	//uglify
	//To Folder
	//Notify
    gulp.task('build-js', function () {
	  var magic = browserify({
	    entries: input.javascript,
	    debug: true
	  });
	  magic.transform(babelify.configure({
	  	presets: ["es2015"]
	  }));
	  magic.bundle()
	  	.pipe(plumber({ errorHandler: onError }))
	    .pipe(source('app.js'))
	    .pipe(buffer())
	    .pipe(sourcemaps.init({loadMaps: true}))
	    	.pipe(jshint())
	    	.pipe(jshint.reporter(stylish))
	        .pipe(uglify())
	        .on('error', gutil.log)
	    .pipe(sourcemaps.write(output.maps))
	    .pipe(gulp.dest(output.javascript))
	    .pipe(notify('ES6 compiled to JS, Linted, Bundled, and Minified'));
	});

//Watch and Build
	//Watch SCSS Folder If Changes Run CSS
	//Watch JS Folder If Changes Run JS

	gulp.task('watch', function() {
		gulp.watch(input.ecmascript, ['build-js'])
		.on('change', function(event) {
			console.log('ES6 File ' + event.path + ' was ' + event.type + ', running tasks sir!')
		});
		gulp.watch(input.sass, ['build-css'])
		.on('change', function(event) {
			console.log('Sass File ' + event.path + ' was ' + event.type + ', running tasks sir!')
		});
	});