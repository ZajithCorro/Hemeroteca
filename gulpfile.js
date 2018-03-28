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
  srcSASS: './source/css/styles.scss',

  tmpHTML: './source/pug/**/*.pug',
  tmpJS: './source/js/**/*.js',
  tmpSASS: './source/css/*.scss'
};

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
    .pipe(gulp.dest('./build/css'))
);

gulp.task('js', () => 
  gulp.src(paths.srcJS)
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'))
);

// gulp.task('css', () =>
//   gulp.src(srcCSS)
//   .pipe(concat('style.css'))
//   .pipe(gulp.dest('./build/css'))
// );

gulp.task('miniCss', () =>
  gulp.src('./build/css/styles.css')
  .pipe(concat('styles.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('./build/css'))
);

gulp.task('default', ['html','js','sass','miniCss'], () => {
  gulp.watch(paths.tmpHTML, ['html'])
  gulp.watch(paths.tmpJS, ['js'])
  gulp.watch(paths.tmpSASS, ['sass'])
  gulp.watch('./build/css/styles.css', ['miniCss'])
});