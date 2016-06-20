// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    shortColor = require('postcss-short-color'),
    cssnext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
    sourcemaps = require('gulp-sourcemaps')
    precss = require('precss')
    cssnano = require('cssnano');



gulp.task('css', function() {
  var processors = [
    cssnext,
    precss,
    autoprefixer,
    cssnano
  ];
    return gulp.src('app/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(notify({ message: 'Styles task complete' }))
        .pipe(browserSync.reload({
            stream: true
        }))
})


// Scripts
gulp.task('scripts', function() {return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('watch', ['browserSync', 'css'], function (){
    gulp.watch('app/css/**/*.scss', ['css']);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
    })
})

//Default tasks
gulp.task('default', function() {
    gulp.start('css', 'scripts', 'watch','browserSync','images');
});
