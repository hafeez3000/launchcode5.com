'use strict';

var actions             = require('./gulp-scripts/gulp-actions'),
    cdnizer             = require('gulp-cdnizer'),
    gulp                = require('gulp'),
    plugins             = require('gulp-load-plugins')(),
    shell               = require('gulp-shell'),
    runSequence         = require('run-sequence');

var buildProperties = {
    GOOGLE_ANALYTICS_ID : process.env.GOOGLE_ANALYTICS_ID || 'DEVELOP',
    appFiles            : require('./gulp-scripts/src-lists/app-files.js'),
    expressPort         : 4000,
    expressRoot         : require('path').resolve('./build/express-tmp'),
    liveReloadPort      : 35729,
    publicDir           : require('path').resolve('./build/www'),
    vendorDirectory     : require('path').resolve('./hugo/static/vendor'),
    useMin              : '',
    vendorFiles         : require('./gulp-scripts/src-lists/vendor-dependencies')
};

gulp.task('clean', function(callback){
    actions.clean('./build/*', callback);
});

gulp.task('dist', function(callback) {

});

gulp.task('hugo-dev', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -D -F -d ../build/hugo -s ./hugo'], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('hugo', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -d ../build/hugo -s ./hugo'], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('default', function(callback) {
    runSequence('express', 'hugo-dev', callback);
});

gulp.task('express', function(callback) {
    actions.startExpress(buildProperties);
    actions.startLiveReload(buildProperties);
    runSequence('clean', 'dist', function()
    {
        //Set up watches
        gulp.watch('src/**/*').on('change', function(file) {
            runSequence('dist', function(){
                actions.notifyLiveReload(file.path);
            });
        });

        gulp.watch('app/index.html').on('change', function(file) {
            actions.notifyLiveReload(file.path);
        });
    });
    if(callback) callback();
});

gulp.task('rebuildApp', function(callback){
    return runSequence('app', callback);
});

gulp.task('vendor', function(callback){
    actions.copyVendorDependencies(buildProperties, callback);
});