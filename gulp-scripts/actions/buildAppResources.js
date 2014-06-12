var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')(),
    streamify               = require('gulp-streamify');

function processImages(buildProperties, callback)
{
    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/images/*', function() {
        gulp.src(buildProperties.qwontifyUxFiles.imageFiles)
            .pipe(gulp.dest(buildProperties.expressRoot + '/images/'))
            .pipe(gulp.dest(buildProperties.publicDir + '/images/'))
            .on('error', plugins.util.log)
            .on('end', function(){ plugins.util.log('Done building app images...');
                 if(callback) callback();
            });
    });
}

function processFonts(buildProperties, callback)
{
    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/fonts/*', function() {
        gulp.src(buildProperties.qwontifyUxFiles.fontFiles)
            .pipe(gulp.dest(buildProperties.expressRoot + '/fonts/'))
            .pipe(gulp.dest(buildProperties.publicDir + '/fonts/'))
            .on('error', plugins.util.log)
            .on('end', function(){ plugins.util.log('Done building app images...');
                 if(callback) callback();
            });
    });
}

function processAssets(buildProperties, callback)
{
    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/assets', function() {
        gulp.src(['./app/assets/*', './app/assets/**/*'])
            .pipe(gulp.dest(buildProperties.expressRoot + '/assets/'))
            .pipe(gulp.dest(buildProperties.publicDir + '/assets/'))
            .on('error', plugins.util.log)
            .on('end', function(){ plugins.util.log('Done copying assets...');
                if(callback) callback();
            });
    });
}

module.exports = function(buildProperties, callback){
    plugins.util.log('Building app resources...');
    processImages(buildProperties, function(){
        processAssets(buildProperties, function(){
            processFonts(buildProperties, callback);
        });
    });
};