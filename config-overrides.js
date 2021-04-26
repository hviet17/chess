module.exports = function override(config) {
    config.module.rules.push({
        test: '/stockfish.js$/',
        use: { loader: 'worker-loader' }
    });

    return config;
};