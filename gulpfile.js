'use strict';

var actions             = require('./gulp-scripts/gulp-actions'),
    connect             = require('gulp-connect'),
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

gulp.task('build-dev', function(callback) {
    runSequence('clean', 'vendor', 'hugo-dev', 'process-hugo-output', callback);
});

gulp.task('process-hugo-output', function(callback) {
    gulp.src(['./build/hugo/**/*.html'], { base: './build/hugo/' })
        .pipe(plugins.replace('${base}', 'http://localhost:4000/'))
        .pipe(gulp.dest(buildProperties.expressRoot))
        .pipe(gulp.dest(buildProperties.publicDir))
        .on('error', plugins.util.log)
        .on('end', function(){
            plugins.util.log('Done copying html files...');
            gulp.src(['./build/hugo/**/*', '!./build/hugo/**/*.html'], { base: './build/hugo/' })
                .pipe(gulp.dest(buildProperties.expressRoot))
                .pipe(gulp.dest(buildProperties.publicDir))
                .on('error', plugins.util.log)
                .on('end', function(){
                    plugins.util.log('Done copying other hugo resources...');
                    if(callback) callback();
                });
        });
});

gulp.task('hugo-dev', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -D -F -d ../build/hugo -s ./hugo'], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('hugo', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -d ../build/hugo -s ./hugo'], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('default', function(callback) {
    runSequence('express', 'build-dev', callback);
});

gulp.task('express', function(callback) {
    //actions.startExpress(buildProperties);
    connect.server({
       root: [buildProperties.expressRoot],
       port: buildProperties.expressPort,
       livereload: true
    });

    //actions.startLiveReload(buildProperties);
    runSequence('clean', 'build-dev', function()
    {
        return gulp.src(['hugo/**/*', '!hugo/static/vendor/**/*'], { read : false})
            .pipe(plugins.watch({ emit: 'all', debounce: 200, timeout: 0 }, function(events, done){
                runSequence('build-dev', function() {
                    connect.reload();
                    //actions.notifyLiveReload(files); //was file.path
                    done();
                });
            }));
     });
});

gulp.task('rebuildApp', function(callback){
    return runSequence('app', callback);
});

gulp.task('vendor', function(callback){
    actions.copyVendorDependencies(buildProperties, callback);
});