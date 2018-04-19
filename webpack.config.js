module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        vendor: './client/bundles/vendor/index.js'
    },
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