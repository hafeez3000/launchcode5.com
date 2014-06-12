'use strict';

var actions             = require('./gulp-scripts/gulp-actions'),
    gulp                = require('gulp'),
    gulpAws             = require('gulp-awspublish'),
    runSequence         = require('run-sequence');

gulp.task('deploy', function(callback){

    // create a new publisher
    var publisher = gulpAws.create({
        "key": "AKIAJXYACETOUPXW7XEA",
        "secret": "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",
        "bucket": "www.wychwoodsoft.com",
        "region": "us-west-2"
    });

    // define custom headers
    var resourceHeaders = {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'Content-Encoding': 'gzip'
    };

    console.log("...starting upload...");
    gulp.src(['./app/**/*'])
        .pipe(gulpAws.gzip())
        .pipe(publisher.publish(resourceHeaders))
        .pipe(gulpAws.reporter())
        .on('end', function(){
            console.log("Publish completed...");
        });
});