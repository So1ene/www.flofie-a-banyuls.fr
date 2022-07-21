const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const linebreak = '------------------------';
    
gulp.task('Compile CSS', async () => {
  gulp.src(['./styles/styles.scss'])
    .pipe(concat('styles.min.scss'))
    .pipe(sass({ 
      outputStyle: 'compressed',
      includePaths: ['./styles/'] 
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('Compile JS', async () => {
  gulp.src(['./scripts/*.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('Watch Files', function() {
  browsersync.init({
    server: {
      baseDir: './dist/',
    }
  });
  gulp.watch([
    './styles/*.scss',
    './styles/*/*.scss',
    './scripts/*.js',
    './dist/*.html'
  ]).on('change', gulp.series(`${linebreak}`, browsersync.reload));
});


gulp.task(`${linebreak}`, gulp.series('Compile JS', 'Compile CSS'));
gulp.task('default', gulp.series(`${linebreak}`));
gulp.task('watch', gulp.series(`${linebreak}`, 'Watch Files'));