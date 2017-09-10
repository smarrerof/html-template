var gulp        = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('hello', function() {
  // For testing purposes
  console.log('Hello world!');
});


// Static server + watching files
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    // Watchers
    gulp.watch("src/**/*.html").on('change', browserSync.reload);
});


gulp.task('watch', ['serve'], function () {
  // Other watchers
});