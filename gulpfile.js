// Add our dependencies
const gulp = require('gulp'),
      connect = require('gulp-connect'),
      fetch = require('isomorphic-fetch'),
      replace = require('gulp-string-replace');

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
  },
  apiServer: {
    url: 'http://localhost:9000/'
  }
};

// Build home page from API data
gulp.task('buildFromApi', () => {
  return fetch(config.apiServer.url)
  .then(apiData => apiData.text())
  .then(apiData => {
    return gulp.src(config.paths.src.html)
      .pipe(replace('<div class="messages"></div>', `<div class="messages"><p>${apiData}</p></div>`))
      .pipe(gulp.dest(config.paths.dist));
  });
});

// Create a web server
gulp.task('startServer', () => {
  connect.server({
    root: 'client/dist',
    port: config.localServer.port,
    livereload: true,
  });
});

gulp.task('default', gulp.series('buildFromApi', 'startServer'));