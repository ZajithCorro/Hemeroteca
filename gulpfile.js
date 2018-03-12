const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifycss =require('gulp-minify-css');
const pug = require('gulp-pug');

const paths = {
  srcHTML: 'source/templates/*.pug',
  srcJS: 'source/js/*.js',
  srcCSS: 'source/css/*.css',

  tmpHTML: 'source/templates/**/*.pug',
  tmpJS: 'source/js/**/*.js',
  tmpCSS: 'source/css/**/*.css'
};

gulp.task('html', () =>
  gulp.src(paths.srcHTML)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/html'))
);

gulp.task('js', () => 
  gulp.src(paths.srcJS)
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
);

gulp.task('css', () =>
  gulp.src(paths.srcCSS)
  .pipe(concat('style.css'))
  .pipe(gulp.dest('build/css'))
);

gulp.task('miniCss', () =>
  gulp.src(paths.srcCSS)
  .pipe(concat('style.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/css'))
);

gulp.task('default', () => {
  gulp.watch(paths.tmpHTML, ['html'])
  gulp.watch(paths.tmpJS, ['js'])
  gulp.watch(paths.tmpCSS, ['css', 'miniCss'])
});