var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
var uploadAzure = require('gulp-upload-azure');
var config = require('/config.json');
)


gulp.task('default', ['compress']);

gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/*.js'),
        rename({suffix: '.min'}),
        uglify(),
        uploadAzure({ account: config.account, key: config.key, container: config.container}),
        gulp.dest('dist')
    ],
    cb
  );
});