var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var useref      = require('gulp-useref');
var gulpIf      = require('gulp-if');
var uglify      = require('gulp-uglify');
var cssnano     = require('gulp-cssnano');



gulp.task('hello', function() {
  // For testing purposes
  console.log('Hello world!');
});

/*
______               _                                  _   
|  _  \             | |                                | |  
| | | |_____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_ 
| | | / _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|
| |/ /  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_ 
|___/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|
                            | |                             
                            |_|
*/

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


/*
______              _            _   _             
| ___ \            | |          | | (_)            
| |_/ / __ ___   __| |_   _  ___| |_ _  ___  _ __  
|  __/ '__/ _ \ / _` | | | |/ __| __| |/ _ \| '_ \ 
| |  | | | (_) | (_| | |_| | (__| |_| | (_) | | | |
\_|  |_|  \___/ \__,_|\__,_|\___|\__|_|\___/|_| |_|
*/
gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
  .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('images', function() {
  return gulp.src('src/assets/images/**/*')
  .pipe(gulp.dest('dist/assets/images'))
})

gulp.task('minify', function(){
  return gulp.src('src/**/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('dist', ['fonts', 'images', 'minify']);
