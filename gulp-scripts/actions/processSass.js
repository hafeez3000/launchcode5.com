var gulp                    = require('gulp'),
    plugins                 = require('gulp-load-plugins')(),
    sass                    = require('gulp-sass'),
    streamify               = require('gulp-streamify');

module.exports = function(buildProperties, callback){
    plugins.util.log('Building main.css...');
    return gulp.src(['./hugo/static/css/*.scss'])
            .pipe(plugins.concat('./css/main.css'))
            .pipe(sass({ includePaths : ['./hugo/static/css/'] }))
            .pipe(streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(buildProperties.expressRoot))
            .pipe(plugins.minifyCss())
            .pipe(streamify(plugins.rev()))
            .pipe(streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(buildProperties.publicDir))
            .on('error', plugins.util.log)
            .on('end', function(){
                plugins.util.log('Done building main.css...');
            });
};