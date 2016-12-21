'use strict';

const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpDotFlatten = require('./libs/gulp-dot-flatten.js');
const merge = require('merge2');
const tsProject = require('gulp-typescript').createProject('tsconfig.json');

//Init
let config;

try {
  config = require('./config.json');
} catch (error) {
  if (error.code == "MODULE_NOT_FOUND") {
    gutil.log(gutil.colors.red('ERROR'), 'Could not find file "config.json"');
  } else {
    gutil.log(error);
  }
  process.exit();
}

if (!config.targets) {
  gutil.log(gutil.colors.red('ERROR'), 'Invalid "config.json" file: cannot find build targets');
  process.exit();
}

if (!config.defaultTarget || !config.targets[config.defaultTarget]) {
  gutil.log(gutil.colors.red('ERROR'), 'Invalid "config.json" file: cannot find default build target');
  process.exit();
}

gutil.log('Successfully loaded', gutil.colors.magenta('config.json'));

if (gutil.env.target) {
  if (!config.targets[gutil.env.target]) {
    gutil.log(gutil.colors.red('ERROR'), 'Invalid build target "' + gutil.env.target + '"');
    gutil.log('Valid build targets are:', '"' + Object.keys(config.targets).join('", "') + '"');
    process.exit();
  }
  gutil.log('Using selected build target', gutil.colors.magenta(gutil.env.target));
} else {
  gutil.log('Using default build target', gutil.colors.magenta(config.defaultTarget));
}

const buildConfig = config.targets[gutil.env.target || config.defaultTarget];

//Tasks
gulp.task('clean', function () {
  return del(['dist/dts/*', 'dist/tmp/*', 'dist/' + buildConfig + '/*', config.localPath + '/' + buildConfig + '/*'], {force: true}).then(paths => {
    gutil.log('Files and folders that would be deleted:\n\t', gutil.colors.magenta(paths.join('\n\t')));
  });
});

gulp.task('compile', ['clean'], function () {
  let res = tsProject.src().pipe(tsProject());
  return merge([
    res.dts.pipe(gulp.dest('dist/dts')),
    res.js.pipe(gulp.dest('dist/tmp'))
  ]);
});

gulp.task('flatten', ['compile'], function () {
  return gulp.src('dist/tmp/**/*.js').pipe(gulpDotFlatten(0)).pipe(gulp.dest('dist/' + buildConfig));
});

gulp.task('copy', ['flatten'], function compile() {
  return gulp.src('dist/' + buildConfig + '/*')
    .pipe(gulp.dest(config.localPath + '/' + buildConfig));
});

gulp.task('build', ['copy'], function buildDone(done) {
  gutil.log(gutil.colors.green('Build done'));
  return done();
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['build'])
    .on('all', function (event, path, stats) {
      console.log('');
      gutil.log(gutil.colors.green('File ' + path + ' was ' + event + 'ed, running tasks...'));
    })
    .on('error', function () {
      gutil.log(gutil.colors.green('Error during build tasks: aborting'));
    });
});

gulp.task('default', ['watch']);