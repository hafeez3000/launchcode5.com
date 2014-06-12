var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ lazy : false });

module.exports.clean = function(path, callback)
{
    plugins.util.log('Cleaning: ./build/');
    gulp
        .src(['./build/*'], {read: false})
        .pipe(plugins.rimraf({force: true}))
        .on('end', callback || function() {});
};

module.exports.cleanFromDirectories = function clean(directories, relativeFile, callback)
{
    plugins.util.log('Cleaning: ' + plugins.util.colors.blue(relativeFile));

    var toDelete = new Array();
    for(var i = 0; i < directories.length; i++) { toDelete.push(directories[i] + '/' + relativeFile); }

    gulp
        .src(toDelete, {read: false})
        .pipe(plugins.rimraf({force: true}))
        .on('end', callback || function() {});
};