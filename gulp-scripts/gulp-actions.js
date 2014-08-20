var NODE_ENV = NODE_ENV || 'dev';

module.exports = {
    clean: require('./actions/clean').clean,
    cleanFromDirectories: require('./actions/clean').cleanFromDirectories,
    copyVendorDependencies: require('./actions/copyVendorDependencies')
};

if(NODE_ENV === 'dev')
{
    module.exports.notifyLiveReload = require('./actions/startLiveReload').notifyLivereload;
    module.exports.startExpress = require('./actions/startExpress');
    module.exports.startLiveReload = require('./actions/startLiveReload').startLiveReload;
}

