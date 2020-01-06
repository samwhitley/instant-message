// Add our dependencies
const gulp = require('gulp'),
      connect = require('gulp-connect'),
      fetch = require('isomorphic-fetch'),
      replace = require('gulp-string-replace'),
      messages = require('./src/js/messages'),
      browserify = require('browserify'),
      source = require('vinyl-source-stream'),
      del = require('del');

const config = {
  paths: {
    src: './src',
    dist: './dist'
  },
  localServer: {
    port: 9001,
    url: 'http://localhost:9001/'
  },
  apiServer: {
    url: 'http://localhost:9000/'
  }
};

gulp.task('clean', () => {
  return del(config.paths.dist, {force: true});
});

// Build home page from API data
gulp.task('buildFromApi', () => {
  return fetch(config.apiServer.url)
  .then(apiData => apiData.json())
  .then(apiData => {
    const messageList = messages.makeList(apiData);

    return gulp.src(`${config.paths.src}/*.html`)
      .pipe(replace('<ul class="messages"></ul>', messageList))
      .pipe(gulp.dest(config.paths.dist));
  });
});

gulp.task('browserify', () => {
  return browserify({
    entries: `${config.paths.src}/js/index.js`,
    debug: true
  })
  .bundle()
  .pipe(source('index.js'))
  .pipe(gulp.dest(`${config.paths.dist}/js`));
});

// Create a web server
gulp.task('startServer', () => {
  connect.server({
    root: config.paths.dist,
    port: config.localServer.port,
    livereload: true,
  });
});

gulp.task('default', gulp.series('clean', 'buildFromApi', 'browserify', 'startServer'));