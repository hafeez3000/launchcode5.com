var gulp            = require('gulp'),
    plugins         = require('gulp-load-plugins')();

module.exports = function(buildProperties, callback)
{
    plugins.util.log('Rebuilding index.html');

    function inject(glob, path, tag) {
        return plugins.inject(
            gulp.src(glob, {
                cwd: path
            }), {
                starttag: '<!-- gulp-inject:' + tag + ':{{ext}} -->'
            }
        );
    }

    function buildIndex(minify, path, cb) {
        var gulpPipe = gulp.src('./app/index.html')
            .pipe(plugins.streamify(plugins.size({ showFiles: true })))
            .pipe(plugins.replace('${qfy.api.server}', buildProperties.API_SERVER))
            .pipe(plugins.replace('${google.analytics.id}', buildProperties.GOOGLE_ANALYTICS_ID))
            .pipe(plugins.replace('${use.min}', buildProperties.useMin))
            .pipe(inject('./css/app*.css', path, 'appcss'))
            .pipe(inject('./css/vendor-concat*.css', path , 'vendorcss'))
            .pipe(inject('./js/app*.js', path, 'appjs'))
            .pipe(inject('./js/vendor-concat*.js', path, 'vendorjs'));

        if(minify) gulpPipe = gulpPipe.pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }));

        gulpPipe.pipe(plugins.streamify(plugins.size({ showFiles: true })))
            .pipe(gulp.dest(path))
            .on('end', cb || function(){ plugins.util.log("Index.html completed for " + path + "..."); })
            .on('error', plugins.util.log);
    }

    buildIndex(false, buildProperties.expressRoot, function(){
        buildIndex(false, buildProperties.publicDir, callback || function(){});
    });
}