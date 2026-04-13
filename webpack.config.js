const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    handler: './handler.js'
  },
  target: 'node',
  resolve: {
    extensions: ['.js']
  },
  externals: {
    'aws-sdk': 'aws-sdk'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.serverless'),
    filename: '[name].js'
  },
  optimization: {
    concatenateModules: false
  }
}
