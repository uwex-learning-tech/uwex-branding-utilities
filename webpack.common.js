const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {

    entry: {
        common: path.resolve(__dirname, './scripts/common.js'),
        email: path.resolve(__dirname, './scripts/email.js'),
        card: path.resolve(__dirname, './scripts/card.js'),
    },
    output: {
        filename: 'scripts/[name].js',
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
    },
    module: {

        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                          // Prefer `dart-sass`
                          implementation: require.resolve('sass'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: 'index.html',
            filename: path.resolve( __dirname, 'dist', 'index.html' ),
            chunks: [ 'common' ],
        } ),
        new HtmlWebpackPlugin( {
            template: 'business-card.html',
            filename: path.resolve( __dirname, 'dist', 'business-card.html' ),
            chunks: [ 'common', 'card' ],
        } ),
        new HtmlWebpackPlugin( {
            template: 'email-signature.html',
            filename: path.resolve( __dirname, 'dist', 'email-signature.html' ),
            chunks: [ 'common', 'email' ],
        } ),
        new CopyWebpackPlugin( {
            patterns: [
                {
                    from: 'images',
                    to: 'images'
                },
                {
                    from: 'scripts/*.php',
                    globOptions: {
                        ignore: [
                            '**/scripts/*.dist.php',
                        ]
                    },
                },
            ],
        } ),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        } ),
    ],

};