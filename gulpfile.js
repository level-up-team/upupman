"use strict";

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const less = require('gulp-less');
const plumber = require('gulp-plumber');

gulp.task('less', () => {
	return gulp.src('src/**/*.less')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('babel', () => {
	return gulp.src('src/**/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015'],
			plugins: ["transform-es2015-modules-amd"]
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
	gulp.watch('src/css/*.less', ['less']);
	gulp.watch('src/script/*.js', ['babel']);
});

gulp.task('default', ['watch']);