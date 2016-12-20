'use strict';

const del = require('del');
const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpDotFlatten = require('./libs/gulp-dot-flatten.js');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });
const webpack = require('webpack-stream');

/********/
/* INIT */
/********/

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

const buildTarget = gutil.env.target || config.defaultTarget;
const buildConfig = config.targets[buildTarget];

/*********/
/* TASKS */
/*********/



gulp.task('clean', function () {
  return del(['dist/tmp/*', 'dist/' + buildConfig + '/*']).then(paths => {
    gutil.log('Files and folders that would be deleted:\n\t', gutil.colors.magenta(paths.join('\n\t')));
  });
});

gulp.task('compile', ['clean'], function bundle() {
  const webpackConfig = require('./webpack.config.js');
  return gulp.src('src/main.ts')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/' + buildConfig));
});

gulp.task('ts-compile', ['clean'], function tsc() {
  global.compileFailed = false;
  return tsProject.src()
    .pipe(tsProject())
    .on('error', (err) => global.compileFailed = true)
    .js.pipe(gulp.dest('dist/tmp'));
});

gulp.task('compile-flat', ['ts-compile'],
  function flatten() {
    return gulp.src('dist/tmp/**/*.js')
      .pipe(gulpDotFlatten(0))
      .pipe(gulp.dest('dist/' + buildConfig));
});


gulp.task('copy-flat', ['compile-flat'], function() {
  return gulp.src('dist/' + buildConfig + '/*')
    .pipe(gulp.dest(config.localPath + '/' + buildConfig));
});

gulp.task('copy', ['compile'], function() {
  return gulp.src('dist/' + buildConfig + '/*')
    .pipe(gulp.dest(config.localPath + '/' + buildConfig));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['copy-flat'])
    .on('all', function(event, path, stats) {
      console.log('');
      gutil.log(gutil.colors.green('File ' + path + ' was ' + event + 'ed, running tasks...'));
    })
    .on('error', function () {
      gutil.log(gutil.colors.green('Error during build tasks: aborting'));
    });
});

gulp.task('build-flat', ['copy-flat'], function buildDone(done) {
  gutil.log(gutil.colors.green('Build done'));
  return done();
});

gulp.task('build', ['copy'], function buildDone(done) {
  gutil.log(gutil.colors.green('Build done'));
  return done();
});

gulp.task('default', ['watch']);
