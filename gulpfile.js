/**
	* Dependencies
**/

const gulp = require('gulp');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify');
const nodemon = require('gulp-nodemon');

/**
	* Tasks
**/

//minify CSS files
function minifyCSS() {
  return gulp.src(['./src/css/*.css', '!./src/css/*.min.css'])
    .pipe(csso())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./src/css/'))
}

//minify HTML files
function minifyHTML() {
  return gulp.src(['./src/html/*.html', '!./src/html/*.min.html'])
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./src/html/'));
}

//minify JS files
function minifyJS() {
  return gulp.src(['./src/js/*.js', '!./src/js/*.min.js'])
    pipe(minify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./src/js/'));
}

//watches files for changes
function watchAll(){
	gulp.watch(['./src/css/*.css', '!./src/css/*.min.css'], gulp.series(minifyCSS));
  gulp.watch(['./src/html/*.html', '!./src/html/*.min.html'], gulp.series(minifyHTML));
  gulp.watch(['./src/js/*.js', '!./src/js/*.min.js'], gulp.series(minifyJS));
}

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
});

/**
	* Tasks export
**/

exports.default = gulp.series(
	minifyCSS,
	minifyHTML,
	minifyJS,
	gulp.parallel(
		nodemon,
		watchAll
	)
)
