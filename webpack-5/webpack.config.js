const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => ({
  entry: {
    common: ['./src/index.js'],
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
    filename: env.dev ? 'js/[name].js' : 'js/[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      { // babel-loader
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { // css-loader
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      { // less-loader
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  env.prod ? 'autoprefixer' : '',
                  'postcss-svgo',
                  'postcss-inline-svg',
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      { // html-loader
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // interpolate: true,
            minimize: env.dev ? false
              : {
                removeComments: true,
                collapseWhitespace: true,
              },
          },
        },
      },
      { // img
        test: /\.(png|jpe?g|webp|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[ext]',
        },
      },
      { // fonts
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
      { // svg static
        test: /\.(svg)$/,
        include: [
          path.resolve(__dirname, './src/common.blocks'),
        ],
        type: 'asset/resource',
      },
      { // svg/multicolor
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './src/assets/svg/multicolor'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      { // svg/monocolor
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './src/assets/svg/monocolor'),
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { name: 'removeUselessStrokeAndFill' },
                { name: 'removeStyleElement' },
                {
                  name: 'removeAttrs',
                  params:
                    { attrs: '(fill|id|fill-opacity)' },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    watchFiles: ['src/**/*.html', 'public/**/*'],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: 'single',
  },
  devtool: env.dev ? 'inline-source-map' : false,

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'public/')],
    }),
    new MiniCssExtractPlugin({
      filename: env.dev ? 'css/[name].css' : 'css/[contenthash].css',
    }),
    new FriendlyErrorsWebpackPlugin(),

    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
      },
    }),

    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'src/index.html',
      filename: 'index.html',
    }),
    // для добавления отдельной html страницы нужно подключить новый HtmlWebpackPlugin
    /* new HtmlWebpackPlugin({
      template: 'src/test.html',
      filename: 'test.html',
    }), */
  ],
});
