var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')(),
    streamify               = require('gulp-streamify');

module.exports = function(buildProperties, callback){
    plugins.util.log('Building vendor-concat.css...');

    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/css/vendor-concat*.css', function() {
        if(buildProperties.vendorFiles.cssFiles.length > 0) {
            gulp.src(buildProperties.vendorFiles.cssFiles)
                .pipe(plugins.concat('./css/vendor-concat.css'))
                .pipe(streamify(plugins.size({ showFiles: true })))
                .pipe(gulp.dest(buildProperties.expressRoot))
                .pipe(plugins.minifyCss())
                .pipe(streamify(plugins.rev()))
                .pipe(streamify(plugins.size({ showFiles: true })))
                .pipe(gulp.dest(buildProperties.publicDir))
                .on('error', plugins.util.log)
                .on('end', function () {
                    plugins.util.log('Done building vendor-concat.css...');
                    if (callback) callback();
                });
        }
        else if(callback) callback();
    });
};