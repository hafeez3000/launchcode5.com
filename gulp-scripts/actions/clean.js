var del = require('del'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ lazy : false });

module.exports.clean = function(path, callback)
{
    plugins.util.log('Cleaning: ./build/');
    del(['./build/*'], callback);
};

module.exports.cleanFromDirectories = function clean(directories, relativeFile, callback)
{
    plugins.util.log('Cleaning: ' + plugins.util.colors.blue(relativeFile));

    var toDelete = [];
    for(var i = 0; i < directories.length; i++) { toDelete.push(directories[i] + '/' + relativeFile); }

    plugins.util.log("About to pipe directories to gulp-rimraf. Directories are:\r\n", directories);
    del(toDelete, callback);
};