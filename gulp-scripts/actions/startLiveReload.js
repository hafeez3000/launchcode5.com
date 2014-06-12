var lrServer          = require('tiny-lr')(),
    permitIndexReload = true;

module.exports = {
    startLiveReload : function(buildProperties) {
        lrServer.listen(buildProperties.liveReloadPort, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    },

    notifyLivereload : function(fileName) {
        if (fileName !== 'gulp.html' || permitIndexReload) {
            lrServer.changed({ body: { files: [fileName] } });

            if (fileName === 'gulp.html') {
                permitIndexReload = false;
                setTimeout(function() { permitIndexReload = true; }, 5000);
            }
        }
    }
}