var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')(),
    streamify               = require('gulp-streamify');

module.exports = function(buildProperties, callback){
    plugins.util.log('Building app.css...');

    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/css/app*.css', function() {
        gulp.src(buildProperties.qwontifyUxFiles.cssFiles)
            .pipe(plugins.concat('./css/app.css'))
            .pipe(streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(buildProperties.expressRoot))
            .pipe(plugins.minifyCss())
            .pipe(streamify(plugins.rev()))
            .pipe(streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(buildProperties.publicDir))
            .on('error', plugins.util.log)
            .on('end', function(){ plugins.util.log('Done building app.css...');
                if(callback) callback();
            });
    });
};