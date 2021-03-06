const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};