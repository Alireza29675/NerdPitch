const fs = require('fs');
const bundleNames = fs.readdirSync('./client/bundles');
const entries = {};
for (let name of bundleNames) {
    entries[name] = `./client/bundles/${name}/index.js`
}

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: entries,
    output: {
        filename: './javascripts/[name].bundle.js',
        sourceMapFilename: './javascripts/[name].bundle.js.map'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: { presets: ['es2015'] }
            }]
    }
};