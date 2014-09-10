var NODE_ENV = NODE_ENV || 'dev';

module.exports = {
    clean: require('./actions/clean').clean,
    cleanFromDirectories: require('./actions/clean').cleanFromDirectories,
    copyVendorDependencies: require('./actions/copyVendorDependencies'),
    processHtml : require('./actions/processHtml'),
    processSass : require('./actions/processSass')
};

