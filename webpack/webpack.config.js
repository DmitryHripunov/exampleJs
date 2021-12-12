const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const autoprefixer = require('autoprefixer');
const PostCssSvgo = require('postcss-svgo');
const PostCssInlineSvg = require('postcss-inline-svg');

const autoprefixerConfig = { overrideBrowserslist: ['last 5 versions', 'ie 11'] };

const postCssConfig = [
  autoprefixer(autoprefixerConfig),
  PostCssInlineSvg,
  PostCssSvgo,
];

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
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'style-loader'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: true,
            minimize: !!env.dev,
          },
        },
      },
      {
        test: /\.(png|jpe?g|webp|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(svg)$/,
        include: [
          path.resolve(__dirname, './src/common.blocks'),
        ],
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './src/assets/svg/multicolor'),
        ],
        type: 'asset/resource',
        generator: {
          filename: 'sprites/[name].[ext]',
        },
        use: [
          {
            loader: 'svg-sprite-loader',
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './src/assets/svg/monocolor'),
        ],
        type: 'asset/resource',
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
        generator: {
          filename: 'sprites/[name].[ext]',
        },
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './src'),
    },
  },
  performance: {
    hints: false,
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
      template: 'src/index.html',
    }),
    // для добавления отдельной html страницы нужно подключить новый HtmlWebpackPlugin
    /* new HtmlWebpackPlugin({
      template: 'src/test.html',
      filename: 'test.html',
    }), */
  ],
});
