const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');

function compilaSass() {
	return gulp.src('./source/styles/main.scss')
		.pipe(sourcemaps.init())
        .pipe(sass({
			outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./build/styles'));
}

function comprimeImagens() {
	return gulp.src('./source/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./build/images'));
}

function comprimeJS() {
	return gulp.src('./source/scripts/*.js')
	.pipe(uglify())
    .pipe(obfuscate())
	.pipe(gulp.dest('./build/scripts'));
}

exports.default = function () {
	gulp.watch('./source/styles/main.scss', { ingoreInitial: false }, gulp.series(compilaSass));
	gulp.watch('./source/images/*', { ingoreInitial: false }, gulp.series(comprimeImagens));
	gulp.watch('./source/scripts/*.js', { ingoreInitial: false }, gulp.series(comprimeJS));
}

exports.img = comprimeImagens;
exports.js = comprimeJS;
exports.sass = compilaSass;