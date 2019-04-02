var gulp = require("gulp"),
    sass = require("gulp-sass"),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    useref = require('gulp-useref'),
    server = require("browser-sync").create();


const paths = {
  // developments
  scss: {
    src: 'src/assets/scss/*.scss',
    dest: 'src/assets/css/'
  },
  // productions
  fonts: {
    src: 'src/assets/fonts/**/*',
    dest: 'dist/assets/fonts/'
  },
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dist/assets/images/'
  },
  scripts: {
    src: 'src/assets/js/**/*.js',
    dest: 'dist/assets/bundle'
  },
  styles: {
    src: 'src/assets/css/**/*.css',
    dest: 'dist/assets/bundle'
  }
};    


// For testing purposes
function hello(cb) {
  //console.log('hello world!')
  cb();
}


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
function reload(done) {
  server.reload();
  done();
}

function generateStyles() {
  return gulp
    .src(paths.scss.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.scss.dest));
}

function serve(done) {
  server.init({
      server: {
          baseDir: "./src"
      }
  });
  done();
}

function watch() {
  gulp.watch(paths.scss.src, gulp.series(generateStyles ,reload));
  gulp.watch("src/*.html", reload);
}


/*
______              _            _   _             
| ___ \            | |          | | (_)            
| |_/ / __ ___   __| |_   _  ___| |_ _  ___  _ __  
|  __/ '__/ _ \ / _` | | | |/ __| __| |/ _ \| '_ \ 
| |  | | | (_) | (_| | |_| | (__| |_| | (_) | | | |
\_|  |_|  \___/ \__,_|\__,_|\___|\__|_|\___/|_| |_|
*/
function copyFonts() {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'));
}

function copyImages() {
  return gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
}

function minify() {
  return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('dist'));
}


/* Export public functions */
exports.hello = hello;

exports.serve = gulp.series(generateStyles, serve, watch);
exports.build = gulp.series(copyFonts, copyImages, generateStyles, minify);
