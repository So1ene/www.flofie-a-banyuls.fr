const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const linebreak = '------------------------';
    
gulp.task('Compile CSS', function(cb) {
  gulp.src(['dev/styles/styles.scss'])
    .pipe(concat('styles.min.scss'))
    .pipe(sass({ 
      outputStyle: 'compressed',
      includePaths: ['dev/styles/'] 
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('.'));
  cb();
});

gulp.task('Compile JS', function(cb) {
  gulp.src(['dev/scripts/*.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
  cb();
});

gulp.task('Watch Files', function() {
  browsersync.init({
    server: {
      baseDir: '.',
    }
  });
  gulp.watch([
    'dev/styles/*.scss',
    'dev/scripts/*.js',
    '*.html'
  ]).on('change', gulp.series(`${linebreak}`, browsersync.reload));
});


gulp.task(`${linebreak}`, gulp.series('Compile JS', 'Compile CSS'));
gulp.task('default', gulp.series(`${linebreak}`));
gulp.task('watch', gulp.series(`${linebreak}`, 'Watch Files'));