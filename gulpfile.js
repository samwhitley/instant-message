// Add our dependencies
const gulp = require('gulp'), // Main Gulp module
      connect = require('gulp-connect'); // Gulp Web server runner plugin

const config = {
  paths: {
    src: {
      html: './client/src/*.html',
    },
    dist: './client/dist/'
  },
  localServer: {
    port: 9001,
    url: 'http://localhost:9001/'
  }
};

// Gulp task to copy HTML files to output directory
gulp.task('html', () => {
  return gulp.src(config.paths.src.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

// Gulp task to create a web server
gulp.task('connect', () => {
  connect.server({
    root: 'client/dist',
    port: config.localServer.port,
    livereload: true,
  });
});

// Watch the file system and reload the website automatically
gulp.task('watch', () => {
  gulp.watch(config.paths.src.html, gulp.series('html'));
});

// Gulp default task
gulp.task('start', gulp.series('html', 'connect'));
gulp.task('default', gulp.parallel('start', 'watch'));
