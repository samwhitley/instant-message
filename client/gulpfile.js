const gulp = require("gulp"),
  connect = require("gulp-connect"),
  fetch = require("isomorphic-fetch"),
  replace = require("gulp-string-replace"),
  cleanCSS = require("gulp-clean-css"),
  imageMin = require("gulp-imagemin"),
  browserify = require("browserify"),
  buffer = require("vinyl-buffer"),
  source = require("vinyl-source-stream"),
  del = require("del"),
  config = require("./src/js/config"),
  uglifyES = require("gulp-uglify-es").default;

// Delete dist directory
gulp.task("clean", () => {
  return del(config.paths.dist, { force: true });
});

// Build home page from API data
gulp.task("buildFromApi", () => {
  let postHelpers = require("./src/js/postHelpers");

  return fetch(config.apiServer.url)
    .then(apiData => apiData.json())
    .then(apiData => {
      let postList = postHelpers.makeList(apiData);

      return gulp
        .src(`${config.paths.src}/*.html`)
        .pipe(replace('<ul class="posts"></ul>', postList))
        .pipe(gulp.dest(config.paths.dist, { overwrite: true }));
    });
});

// Copy images to dist
gulp.task("images", () => {
  return gulp
    .src(`${config.paths.src}/images/**`)
    .pipe(imageMin())
    .pipe(gulp.dest(`${config.paths.dist}/images`));
});

// Copy css to dist
gulp.task("css", () => {
  return gulp
    .src(`${config.paths.src}/css/**`)
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${config.paths.dist}/css`, { overwrite: true }))
    .pipe(connect.reload());
});

// Create JS bundle for client side use
gulp.task("browserify", () => {
  return browserify({
    entries: `${config.paths.src}/js/index.js`,
    debug: true
  })
    .bundle()
    .pipe(source("index.js"))
    .pipe(buffer())
    .pipe(uglifyES())
    .pipe(gulp.dest(`${config.paths.dist}/js`, { overwrite: true }))
    .pipe(connect.reload());
});

gulp.task("watch", () => {
  gulp.watch(
    `${config.paths.src}/js`,
    gulp.series("buildFromApi", "browserify")
  );
  gulp.watch(`${config.paths.src}/css`, gulp.series("css"));
});

// Create a web server
gulp.task("startServer", () => {
  return connect.server({
    root: config.paths.dist,
    port: config.localServer.port,
    livereload: true
  });
});

gulp.task(
  "start",
  gulp.series(
    "clean",
    "buildFromApi",
    "browserify",
    "css",
    "images",
    "startServer"
  )
);
gulp.task("default", gulp.parallel("start"));
