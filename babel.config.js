module.exports = function(api) {
    api.cache(true);

    var presets = [
        ['@babel/preset-env', {
            targets: [
                'last 2 version',
                'ie >= 9'
            ],
            modules: 'commonjs'     // transform esm to cjs, false to keep esm.
        }]
    ];

    var plugins = [
        '@babel/plugin-transform-runtime', 
        '@babel/plugin-proposal-class-properties', 
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-export-namespace-from'
    ];

    return {
        presets,
        plugins
    };
};
