var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');


gulp.task('hello', function() {
  // For testing purposes
  console.log('Hello world!');
});


// Static server + watching files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  // Watchers
  gulp.watch("src/assets/css/**/*.scss", ['sass']);
  gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/assets/css/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("src/assets/css"))
    .pipe(browserSync.stream());
});


gulp.task('watch', ['serve'], function () {
  // Other watchers
});