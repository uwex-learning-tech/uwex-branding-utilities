const { merge } = require( 'webpack-merge' );
const common = require( './webpack.common.js' );
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge( common, {

    mode: 'production',
    optimization: {
        minimizer: [
          new TerserPlugin( 
            { extractComments: false }
          )
        ],
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
  },
    
} );