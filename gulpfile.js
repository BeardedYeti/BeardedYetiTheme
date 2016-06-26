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
	sourcemaps = require('sourcemaps'), // Provide external sourcemap files
	
//Path Sources

	input = {
      'sass': 'sass/**/*.scss',
      'es6': 'es6/**/*.js'
    },
    output = {
      'css': 'style.css',
      'js': 'js'
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
    	return gulp.src(input.sass)
    		.pipe(plumber({ errorHandler: onError }))
    		.pipe(sourcemaps.init())
      		.pipe(sass({
        		css: 'style.css',
        		sass: 'sass/style.scss'
        	}))
      		.pipe(autoprefixer())
      		.pipe(minifycss())
    		.pipe(sourcemaps.write())
    		.pipe(gulp.dest(output.stylesheets))
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

	gulp.task('build-js', function() {
    	return browserify({entries: input.es6, debug: true})
	      	.pipe(plumber({ errorHandler: onError }))
	      	.transform(babelify)
	      	.pipe(jshint())
	      	.pipe(jshint.reporter(stylish))
	      	.bundle()
	      	.pipe(source('bundle.js'))
	      	.pipe(buffer())
	      	.pipe(uglify())
	        .pipe(gulp.dest(output.js));
	        .pipe(notify('ES6 compiled to JS, Linted, Bundled, and Minified'));
    });

//Watch and Build
	//Watch SCSS Folder If Changes Run CSS
	//Watch JS Folder If Changes Run JS

	gulp.task('watch', function() {
		gulp.watch(input.es6, ['build-js']);
		gulp.watch(input.sass, ['build-css']);
	});