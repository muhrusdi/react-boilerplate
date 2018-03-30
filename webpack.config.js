const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const paths = {
  client: path.resolve(__dirname, './src/client/src'),
  server: path.resolve(__dirname, './src/server/src'),
  public: path.resolve(__dirname, './public')
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(paths.client, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

const clientConfig = {
  entry: path.join(paths.client, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: paths.public
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  devServer: {
    inline: true,
    port: 2323,
    hot: true,
    historyApiFallback: true,
    contentBase: paths.public
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
				exclude: /node_modules/,
				query: {
          plugins: [
            'babel-plugin-transform-decorators-legacy', 
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
					{ loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /.*\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
              limit: 20000,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins:[
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ]
}

const serverConfig = {
  entry: path.join(paths.server, 'index.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: paths.public,
    filename: 'server.js',
    publicPath: paths.public
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
				exclude: /node_modules/,
				query: {
          plugins: ['babel-plugin-transform-decorators-legacy', 'babel-plugin-transform-object-rest-spread']
        }
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
}

module.exports = [clientConfig, serverConfig]