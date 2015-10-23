// Include gulp
var gulp = require('gulp');
 // Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
//var inline = require('gulp-inline');
//var inline = require('gulp-inline-source');
//var smoosher = require('gulp-smoosher');

 // Define base folders
var dest = 'build/';
var paths = {
    libs: ['bower_components/jquery/dist/jquery.min.js',
           'bower_components/underscore/underscore-min.js',
           'bower_components/backbone/backbone-min.js',
           'bower_components/backbone.localStorage/backbone.localStorage-min.js'],
    scripts: ['src/js/models/searchItem.js',
              'src/js/models/resultsItem.js',
              'src/js/collections/searchItems.js',
              'src/js/collections/resultsItems.js',
              'src/js/views/searchItemView.js',
              'src/js/views/resultsItemView.js',
              'src/js/views/searchView.js',
              'src/js/views/resultsView.js',
              'src/js/routers/router.js',
              'src/js/app.js'],
    styles: ['src/assets/index.css'],
    images: ['src/img/*'],
    content: ['src/index.html']
};

// Copy libs
gulp.task('libscopy', function() {
    return gulp.src(paths.libs)
        .pipe(gulp.dest(dest + 'js/lib'));
});

// Concatenate & Minify JS
gulp.task('jsminify', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + 'js'));
});

// Concatenate & Minify CSS
gulp.task('cssminify', function() {
    return gulp.src(paths.styles)
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dest + 'assets'));
});

// Minify HTML
gulp.task('htmlminify', function() {
  var opts = {
    conditionals: true,
    spare: true,
    empty: true,
    quotes: true
  };

  return gulp.src(paths.content)
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest(dest));
});

// Images optimization
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dest + 'img'));
});

 // Watch for changes in files
gulp.task('watch', function() {
    gulp.watch(paths.libs, ['libscopy']);
    gulp.watch(paths.scripts, ['jsminify']);
    gulp.watch(paths.styles, ['cssminify']);
    gulp.watch(paths.content, ['htmlminify']);
    gulp.watch(paths.images, ['images']);
 });

 // Default Task
gulp.task('default', [
            'libscopy',
            'jsminify',
					  'cssminify',
					  'htmlminify',
					  'images',
					  'watch']);