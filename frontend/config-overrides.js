const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(
      new MonacoWebpackPlugin({
          languages: ['json', 'python'],
      }),
      new NodePolyfillPlugin()
    );

    config.resolve = {
        ...config.resolve,
        alias: {
            // Alias to remove `node:` protocol issues
            'node:fs': 'fs',
            'node:tls': 'tls',
            'node:net': 'net',
            'node:path': 'path',
            'node:zlib': 'zlib',
            'node:http': 'http',
            'node:https': 'https',
            'node:stream': 'stream',
            'node:crypto': 'crypto',
        },
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: require.resolve('path-browserify'),
            zlib: require.resolve('browserify-zlib'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            stream: require.resolve('stream-browserify'),
            crypto: require.resolve('crypto-browserify'),
        },
    };

    return config;
};
