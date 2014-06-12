'use strict';

var cleanFromDirectories    = require('./clean').cleanFromDirectories,
    gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')(),
    rename      = require('gulp-rename');

function convertTemplatesToScript(buildProperties, callback)
{
    //Build templates js.
    gulp.src(buildProperties.qwontifyUxFiles.templateFiles)
        .pipe(plugins.streamify(plugins.size({ showFiles: true })))
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.angularTemplatecache({
            root:   'js/',
            module: 'qwontifyUxApp'
        }))
        .pipe(plugins.concat('app-templates.generated.js'))
        .pipe(plugins.streamify(plugins.size({ showFiles: true })))
        .pipe(plugins.insert.prepend("/* This file is generated as a part of build process - do not edit, re-build instead! */\r\n"))
        .pipe(gulp.dest("./app/js"))
        .on('end', callback || function() {})
        .on('error', plugins.util.log);
}

function concatenateJs(buildProperties, callback)
{
    gulp.src(buildProperties.qwontifyUxFiles.jsFiles)
        .pipe(plugins.concat('js/app.js'))
        .pipe(plugins.replace('${qfy.api.server}', buildProperties.API_SERVER))
        .pipe(gulp.dest(buildProperties.expressRoot))
        .pipe(plugins.streamify(plugins.size({ showFiles: true })))
        .pipe(plugins.streamify(plugins.uglify({ mangle: false })))
        .pipe(plugins.streamify(plugins.size({ showFiles: true })))
        .pipe(plugins.streamify(plugins.rev()))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(buildProperties.publicDir))
        .on('end', function(){
            plugins.util.log('Done building app.js & app.min.js...');
            var fn = callback || function() {};
            fn();
        });
}



module.exports = function(buildProperties, callback)
{
    cleanFromDirectories([buildProperties.publicDir, buildProperties.expressRoot], '/js/app*.js', function() {
        convertTemplatesToScript(buildProperties, function(){
            concatenateJs(buildProperties, callback);
        })
    });

};