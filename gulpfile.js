const gulp         = require('gulp');
const del          = require('del');
const cssnano      = require('gulp-cssnano');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const uglify       = require('gulp-uglify');
const server       = require('gulp-webserver');
const watch        = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const named        = require('vinyl-named');
const less         = require('gulp-less');
const webpack      = require('webpack-stream');
const plumber      = require('gulp-plumber');
const nunjucks     = require('gulp-nunjucks-render');
const webConfig    = require('./webpack.config.js');

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('html', () => {
  gulp.src('app/templates/*.html')
    .pipe(plumber({
      errorHandler: err => {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(nunjucks({
      path: ['app/templates']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', () => {
  return gulp.src([
    'app/less/*.less'
  ])
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', () => {
  return gulp.src(['app/js/*.bundle.js'])
    .pipe(named())
    .pipe(webpack(webConfig))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js:watch', () => {
  const watch = Object.create(webConfig);

  watch.watch = true;

  return gulp.src([
    'app/js/*.bundle.js'
  ])
    .pipe(named())
    .pipe(webpack(watch))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
  return gulp.src(['app/img/*'])
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', () => {
  return gulp.src(['app/fonts/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('serve', () => {
  gulp.src('dist')
    .pipe(server({
      livereload:    true,
      open:          true,
      log:           'debug',
      clientConsole: true,
      defaultFile:   'index.html',
      fallback:      'index.html'
}));
    
  gulp.start('watch');
});

gulp.task('watch', () => {
  watch('app/templates/**', () => {
    gulp.start('html');
  });
    
  watch('app/less/**/**', () => {
    gulp.start('less');
  });

  watch('app/img/**', () => {
    gulp.start('img');
  });
    
  watch('app/fonts/**', () => {
    gulp.start('fonts');
  });
    
  gulp.start('js:watch');
});

gulp.task('build', ['html', 'less', 'js', 'img', 'fonts']);

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});