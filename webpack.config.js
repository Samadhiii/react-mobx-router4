const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const environment = process.env.type;

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['react', 'reactDom'],
    filename: 'js/[name].js',
    minChunks: 2,
  }),
  new HtmlPlugin({
    minify: {
      removeAttributeQuotes: true,
    },
    hash: true,
    template: './src/index.html',
  }),
  new DefinePlugin({
    'process.env': environment === 'dev' ? require('./config/dev.env') : require('./config/prod.env')
  }),
  new HappyPack({
    id: 'babel',
    loaders: ['babel-loader?cacheDirectory'],
    threadPool: happyThreadPool,
  }),
];

if (environment === 'prod') {
  plugins.push(
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
    new CopyPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: './static',
    }]),
    new ExtractTextPlugin('styles/[name]_[contenthash:8].css'),
    new webpack.BannerPlugin('Author:Datatom')
  );
} else {
  plugins.push(new ExtractTextPlugin('styles/[name].css'));
}

module.exports = {
  devtool: environment === 'prod' ? '#source-map' : 'cheap-module-eval-source-map',
  entry: {
    index: './src/index.js',
    react: 'react',
    reactDom: 'react-dom',
  },
  // entry: ['webpack-dev-server/client?http://0.0.0.0:8888/', 'webpack/hot/dev-server', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: environment === 'prod' ? './' : '/',
  },
  resolve: {
    alias: {
      assets: path.join(__dirname, 'src/assets'),
      components: path.join(__dirname, 'src/components'),
      models: path.join(__dirname, 'src/models'),
      templates: path.join(__dirname, 'src/templates'),
      routes: path.join(__dirname, 'src/routes'),
      utils: path.join(__dirname, 'src/utils'),
      views: path.join(__dirname, 'src/views'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        publicPath: '../',
        use: [{
          loader: 'css-loader?minimize',
        },
        {
          loader: 'postcss-loader',
        },
        ],
      }),
    },
    {
      test: /\.(jpg|png|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'images/',
        },
      }],
    },
    {
      test: /\.(html|htm)$/i,
      use: ['html-withimg-loader'],
    },
    {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader?minimize',
        },
        {
          loader: 'less-loader',
        },
        ],
        fallback: 'style-loader',
      }),
    },
    {
      test: /\.(jsx|js)$/,
      use: {
        loader: 'happypack/loader?id=babel',
      },
      exclude: /node_modules/,
    },
    ],
  },
  plugins,
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    host: '0.0.0.0',
    compress: true,
    port: '8888',
    // hot: true,
    historyApiFallback: true,
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/,
  },
};
