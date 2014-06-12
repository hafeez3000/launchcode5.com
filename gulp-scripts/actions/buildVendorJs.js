var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')();

module.exports = function(buildProperties, callback){
    plugins.util.log('Building vendor-concat.js...');

    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/js/vendor-concat*.js', function() {
        gulp.src(buildProperties.vendorFiles.jsFiles)
            .pipe(plugins.concat('./js/vendor-concat.js'))
            .pipe(gulp.dest(buildProperties.expressRoot))
            .pipe(plugins.streamify(plugins.size({ showFiles: true })))
            .pipe(plugins.streamify(plugins.uglify({ mangle: false })))
            .pipe(plugins.streamify(plugins.rev()))
            .pipe(plugins.rename({suffix: '.min'}))
            .pipe(plugins.streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(buildProperties.publicDir))
            .on('error', plugins.util.log)
            .on('end', function(){
                plugins.util.log('Done building vendor-concat.js...');
                if(callback) callback();
            });
    });
};