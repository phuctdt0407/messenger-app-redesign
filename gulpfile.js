var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();
var sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
  return (
    gulp
      .src("src/assets/sass/style.scss")
      .pipe(sourcemaps.init())
      .pipe(sass()) 
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("pub/assets/css"))
      .pipe(
        browserSync.reload({
          stream: true
        })
      )
  );
});
gulp.task("sass-production", function() {
  return (
    gulp
      .src("src/assets/sass/style.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write("."))
      .pipe(cssmin())
      .pipe(rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest("pub/assets/css"))
  ); 
});

gulp.task("pug", function() {
  return gulp
    .src(["src/*.pug", "!src/partials/**/*.pug", "!src/layout.pug"])
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest("pub"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    ); 
});
gulp.task("js", function() {
  return gulp.src("src/assets/js/*.js").pipe(gulp.dest("pub/assets/js"));
});

gulp.task("images", function() {
  return gulp
    .src("src/assets/images/**/*.+(png|jpg|jpeg|gif|svg|ico)")
    .pipe(gulp.dest("pub/assets/images"));
});

gulp.task("fonts", function() {
  return gulp.src("src/assets/fonts/**/*").pipe(gulp.dest("pub/assets/fonts"));
});

gulp.task("libs", function() {
  return gulp.src("src/assets/libs/**/*").pipe(gulp.dest("pub/assets/libs"));
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "pub"
    }
  });
});

gulp.task('watch', function() { 
  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("src/assets/sass/**/*.scss", gulp.series("sass"));
  gulp.watch("src/assets/js/*.js", gulp.series("js"));
  gulp.watch("src/assets/fonts/**/*", gulp.series("fonts"));
  gulp.watch("src/assets/libs/**/*", gulp.series("libs"));
  gulp.watch("src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)", gulp.series("images"));
});

gulp.task('default', gulp.series("sass", "pug", "images", "fonts", "libs", "js", "watch"));