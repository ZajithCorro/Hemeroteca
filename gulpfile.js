const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifycss =require('gulp-minify-css');
const pug = require('gulp-pug');

const paths = {
  srcHTML: './source/pug/pages/*.pug',
  srcJS: './source/js/*.js',

  tmpHTML: './source/pug/**/*.pug',
  tmpJS: './source/js/**/*.js',
  tmpCSS: './source/css/*.css'
};

const srcCSS = [
  './source/css/generales.css', './source/css/menu.css'
];

gulp.task('html', () =>
  gulp.src(paths.srcHTML)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    })) //pretty: true
    .pipe(gulp.dest('./build'))
);

gulp.task('js', () => 
  gulp.src(paths.srcJS)
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
);

gulp.task('css', () =>
  gulp.src(srcCSS)
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./build/css'))
);

gulp.task('miniCss', () =>
  gulp.src(srcCSS)
  .pipe(concat('style.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('./build/css'))
);

gulp.task('default', ['html','css','js','miniCss'], () => {
  gulp.watch(paths.tmpHTML, ['html'])
  gulp.watch(paths.tmpJS, ['js'])
  gulp.watch(paths.tmpCSS, ['css','miniCss'])
});