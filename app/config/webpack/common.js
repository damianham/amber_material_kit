const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackEnv = process.env.NODE_ENV || 'development'
const isEnvProduction = webpackEnv === 'production'

let config = {
  entry: {
    main: path.resolve(__dirname, 'entry.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../../public/dist'),
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      amber: path.resolve(__dirname, '../../lib/amber/assets/js/amber.js')
    },
    modules: ['src/assets/javascripts', 'src', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=/images/[name].[ext]'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader?name=/[name].[ext]'
        ]
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides'
            ),

            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svgr/webpack?-svgo![path]',
                    },
                  },
                },
              ],
            ],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            cacheCompression: isEnvProduction,
            compact: isEnvProduction,
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    })
  ],
  // For more info about webpack logs see: https://webpack.js.org/configuration/stats/
  stats: 'errors-only'
};

module.exports = config;
