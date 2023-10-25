const path = require('path');

module.exports = {
    entry: './src/assets/index.js',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'index.js',
    },
};
