var NODE_ENV = NODE_ENV || 'dev';

module.exports = {
    buildAppCss: require('./actions/buildAppCss'),
    buildAppHtml: require('./actions/buildAppHtml'),
    buildAppJs: require('./actions/buildAppJs'),
    buildAppResources: require('./actions/buildAppResources'),
    buildVendorCss: require('./actions/buildVendorCss'),
    buildVendorJs: require('./actions/buildVendorJs'),
    clean: require('./actions/clean').clean,
    cleanFromDirectories: require('./actions/clean').cleanFromDirectories,
};

if(NODE_ENV === 'dev')
{
    module.exports.notifyLiveReload = require('./actions/startLiveReload').notifyLivereload;
    module.exports.startExpress = require('./actions/startExpress');
    module.exports.startLiveReload = require('./actions/startLiveReload').startLiveReload;
}

