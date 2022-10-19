var paths = {
  sass: ['scss/mycss.scss','scss/global.scss','scss/variables.scss','src/*.scss', "src/theme/*.scss"],
  ts: ['typescript/*.ts']
};
var rename=require("gulp-rename");
var gulp = require('gulp');
var clean = require('gulp-clean');
var minifyCss = require('gulp-css-minify');
var sass = require ('gulp-sass')(require('sass'));
var embedTemplates = require('gulp-angular-embed-templates');
var typescript = require('gulp-tsc');
var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json");
gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});
gulp.task("default", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});
// Data
gulp.task('data', function () {
    return gulp.src([
            'app/scripts/**/*.csv',
            'app/scripts/**/*.json'])
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size());
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src([
                    'app/bower_components/font-awesome/fonts/fontawesome-webfont.*'])
            .pipe(gulp.dest('dist/fonts/'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], { read: false }).pipe(clean());
});
// Default task
gulp.task('default', ["sass"], function () {
    gulp.start('build');
});
gulp.task('js:build', function () {
    gulp.src('ts/*.ts') // also can use *.js files
        .pipe(embedTemplates({sourceType:'ts'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('build', ['sass','js:build'], function() {
});


gulp.task('compile', function(){
    gulp.src(paths.ts)
        .pipe(typescript({ emitError: false }))
        .pipe(gulp.dest('www/'));
});


gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.ts, ['compile']);
});
gulp.task('watch:before',['sass','default'], function () {});
gulp.task('serve:before', ['build','watch'], function () {});
