var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')();

module.exports = function(buildProperties, callback){
    plugins.util.log('Copying vendor dependencies...');

    var directoriesToClean = [
            buildProperties.publicDir + '/vendor',
            buildProperties.expressRoot + '/vendor'

    ];

    cleanFromDirectories(directoriesToClean, '*', function() {
        plugins.util.log("Vendor file cleanup completed, copying vendor files...");
        gulp.src(buildProperties.vendorFiles.directories, { base: './bower_components/' })
            .pipe(gulp.dest( buildProperties.publicDir + '/vendor'))
            .pipe(gulp.dest( buildProperties.expressRoot + '/vendor'))
            .on('error', plugins.util.log)
            .on('end', function(){
                plugins.util.log('Done copying vendor dependencies.');
                if(callback) callback();
            });
    });
};