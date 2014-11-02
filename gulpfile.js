'use strict';

var actions             = require('./gulp-scripts/gulp-actions'),
    connect             = require('gulp-connect'),
    gulp                = require('gulp'),
    gulpAws             = require('gulp-awspublish'),
    plugins             = require('gulp-load-plugins')(),
    shell               = require('gulp-shell'),
    runSequence         = require('run-sequence');

var buildProperties = {
    GOOGLE_ANALYTICS_ID : process.env.GOOGLE_ANALYTICS_ID || 'DEVELOP',
    appFiles            : require('./gulp-scripts/src-lists/app-files.js'),
    base                : 'http://localhost:4000/',
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
    runSequence('clean', 'vendor', 'hugo-dev', 'buildCss', 'process-hugo-output', callback);
});

gulp.task('process-hugo-output', function(callback) {
    actions.processHtml(buildProperties, function() {
        //copy non-html files
        var gulpPipe = gulp.src(['./build/hugo/**/*', '!./build/hugo/**/*.html'], { base: './build/hugo/' })
            .pipe(gulp.dest(buildProperties.expressRoot))
            .pipe(gulp.dest(buildProperties.publicDir))
        //.pipe(inject('./css/vendor-concat*.css', path , 'vendorcss'))
        //.pipe(inject('./js/app*.js', path, 'appjs'))
        //.pipe(inject('./js/vendor-concat*.js', path, 'vendorjs'));
            .on('end', function() {
                if(callback) callback();
            });

    });

});

gulp.task('hugo-dev', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -D -F -d ../build/hugo -s ./hugo -b ' + buildProperties.base], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('hugo', ['vendor'], function(callback) {
    gulp.src('').pipe(shell(['hugo -v -d ../build/hugo -s ./hugo -b ' + buildProperties.base], { cwd: process.cwd() })).on('end', callback || function() {});;
});

gulp.task('default', function(callback) {
    runSequence('express', 'build-dev', callback);
});

gulp.task('buildProd', function(callback) {
   buildProperties.GOOGLE_ANALYTICS_ID = 'UA-55041245-1';
   buildProperties.base = 'http://www.launchcode5.com/';
   runSequence('clean', 'vendor', 'hugo', 'buildCss', 'process-hugo-output', function(){
       console.log("Completed buildProd, calling callback...");
       if(callback) callback();
   });
});

gulp.task('buildCss', function(callback) {
    return actions.processSass(buildProperties, callback);
});

gulp.task('express', function(callback) {

    connect.server({
       root: [buildProperties.expressRoot],
       port: buildProperties.expressPort,
       livereload: true
    });

    //actions.startLiveReload(buildProperties);
    runSequence('clean', 'build-dev', function()
    {
        plugins.util.log("Starting watches...");
        gulp.watch(['./src/js/**/*.js'], ['scripts']);
        gulp.watch(['hugo/**/*.scss'], ['buildCss']);
        gulp.watch(['hugo/static/**/*', '!hugo/static/**/*.scss'], ['build-dev']); /* We really don't need to do a build for this - just move the files over. */
        gulp.watch(['hugo/content/**/*', 'hugo/layouts/**/*', '!hugo/layouts/**/*.scss'], ['build-dev']);
    });
});

gulp.task('rebuildApp', function(callback){
    return runSequence('app', callback);
});

gulp.task('vendor', function(callback){
    actions.copyVendorDependencies(buildProperties, callback);
});

gulp.task('deploy:production', ['buildProd'], function(callback){

    buildProperties.API_SERVER = 'https://gameserver.rateandpillage.com';
    buildProperties.FIREBASE_SERVER = '<replace me!>'
    buildProperties.useMin = 'min.';

    // create a new publisher
    var publisher = gulpAws.create({
         "key": "AKIAJXYACETOUPXW7XEA",
         "secret": "4G475F+jeyq4FXVStVm5TUr9lF2RxXUew4B972xK",
         "bucket": "www.launchcode5.com",
         "region": "us-west-2"
    });

        // define custom headers
        var resourceHeaders = {
            'Cache-Control': 'max-age=1209600, no-transform, public',
            'Content-Encoding': 'gzip'
        };

        var htmlHeaders = {
            'Cache-Control': 'max-age=0, no-transform, public',
            'Content-Encoding': 'gzip'
        };

        console.log("...starting upload...");
        gulp.src(['./build/www/**/*',
            //Skip anything starting with a '!'
            '!./build/www/**/*.scss', '!./build/www/**/*.html', '!./build/www/js/pdfjs/cmaps/**/*', '!./build/www/js/pdfjs/locale/**/*', '!./build/www/js/pdfjs/images/**/*'])
            .pipe(gulpAws.gzip())
            .pipe(publisher.publish(resourceHeaders))
            .pipe(gulpAws.reporter())
            .on('end', function(){
                gulp.src(['./build/www/**/*.html'])
                    .pipe(gulpAws.gzip())
                    .pipe(publisher.publish(htmlHeaders))
                    .pipe(gulpAws.reporter())
                    .on('end', function(){
                        console.log("Completed upload...");
                    });
            });

});

