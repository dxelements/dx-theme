'use strict';
const gulp = require('gulp');
const pkg = require('./package.json');
const path = require('path');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const importOnce = require('node-sass-import-once');
const stylemod = require('gulp-style-modules');
const browserSync = require('browser-sync').create();

/**
 * TASK: `$ gulp sass`
 * Builds SCSS files into CSS files
 */

const sassOptions = {
  importer: importOnce,
  importOnce: {
    index: true,
    bower: true
  }
};

const autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: false,
  flexbox: false
};

const stylemodOptions = {
  moduleId: file => path.basename(file.path, path.extname(file.path)) + '-styles'
};

gulp.task('sass:clean', function() {
  return del(['./css/**/*']);
});

gulp.task('sass:build', function() {
  return gulp.src(['./sass/*.scss'])
    .pipe(sass(sassOptions))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(cssmin())
    .pipe(stylemod(stylemodOptions))
    .pipe(gulp.dest('./'))
});

gulp.task('sass', ['sass:clean', 'sass:build']);

/**
 * TASK: `$ gulp watch`
 * Watches for changes to SCSS files and continuously rebuilds CSS files.
 * Use this if you want to run your own server, or use the serve task to run
 * a server and rebuild CSS files.
 */

gulp.task('watch', function() {
  gulp.watch(['*.scss', 'sass/*.scss'], ['sass']);
});

/**
 * TASK: `$ gulp serve`
 * Starts a web server to serve the demo. Continuously refreshes and rebuilds
 * the SCSS files into CSS file using BrowserSync.
 */

gulp.task('serve', function() {
  browserSync.init({
    port: 8080,
    notify: false,
    reloadOnRestart: true,
    logPrefix: `${pkg.name}`,
    https: false,
    server: ['./', 'bower_components'],
  });

  gulp.watch(['css/*-styles.html', '*.html', '*.js', 'demo/*.html']).on('change', browserSync.reload);
  gulp.watch(['*.scss', 'sass/*.scss'], ['sass']);
});

/**
 * TASK: `$ gulp bump:*`
 * Bumps the version number in the bower.json and package.json to prepare for
 * a new release.
 */

gulp.task('bump:patch', function() {
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function() {
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function() {
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

/**
 * DEFAULT TASK: `$ gulp`
 * Builds SCSS files into CSS files
 */

gulp.task('default', ['sass']);
