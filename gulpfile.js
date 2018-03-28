const gulp = require('gulp');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minifycss =require('gulp-minify-css');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

const paths = {
  srcHTML: './source/pug/pages/*.pug',
  srcJS: './source/js/*.js',
  srcSASS: './source/css/sass/styles.scss',

  tmpHTML: './source/pug/**/*.pug',
  tmpJS: './source/js/**/*.js',
  tmpCSS: './source/css/*.css',
  tmpSASS: './source/css/sass/*.scss'
};

const srcCSS = [
  './source/css/reset.css', './source/css/generales.css', './source/css/menu.css', './source/css/form.css', './source/css/responsive.css'
];

gulp.task('html', () =>
  gulp.src(paths.srcHTML)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build'))
);

gulp.task('sass', () =>
  gulp.src(paths.srcSASS)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./build/css/sass'))
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

gulp.task('default', ['html','css','js','miniCss','sass'], () => {
  gulp.watch(paths.tmpHTML, ['html'])
  gulp.watch(paths.tmpJS, ['js'])
  gulp.watch(paths.tmpCSS, ['css','miniCss']),
  gulp.watch(paths.tmpSASS, ['sass'])
});