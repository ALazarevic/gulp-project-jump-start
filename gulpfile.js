const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const image = require('gulp-image');


gulp.task('serve', () => {
  browserSync.init({
    server: './dist',
  });

  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch(['src/js/script.js', 'src/js/components/**/*.js'], ['babel']).on('change', browserSync.reload);
  gulp.watch('src/*.html', ['copy']).on('change', browserSync.reload);
  gulp.watch('src/*.html', ['image']).on('change', browserSync.reload);

});

gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browserlist: ['last 3 versions'],
      cascade: false,
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'))
});

gulp.task('babel', () => {
  gulp.src(['src/js/script.js', 'src/js/components/**/*.js'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.bundle.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('image', () => {
  return gulp.src('src/img/**')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('init', ['image', 'sass', 'copy', 'babel', 'serve']);

gulp.task('default', ['serve']);