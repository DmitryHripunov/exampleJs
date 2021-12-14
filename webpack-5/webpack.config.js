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
    main: path.resolve('./src/index.js'),
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
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: true,
          },
        },
      },
      { // css-loader
        test: /\.css$/,
        use: [
          env.dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      { // less-loader
        test: /\.less$/,
        use: [
          env.dev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
        include: /common.blocks/,
        use: [
          'html-loader',
          'extract-loader',
          {
            options: {
              minimize: env.dev ? false
                : {
                  removeComments: true,
                  collapseWhitespace: true,
                },
            },
          },
        ],
      },
      { // img
        test: /\.(png|jpe?g|webp|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      { // fonts
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/inline',
        // generator: {
        //   filename: 'fonts/[name].[ext]',
        // },
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
    open: true,
    compress: true,
    watchFiles: ['src/*.html', 'src/**/*'],
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

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, 'src/static'),
    //       to: 'static',
    //       globOptions: {
    //         ignore: ['*.md'],
    //       },
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      title: 'test title',
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
