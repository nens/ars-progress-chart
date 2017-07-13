const path = require("path");
var webpack = require("webpack");

var libraryName = "ars-progress-chart";

var config = {
  context: path.join(__dirname, "src"),
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    __dirname + "/src/index.js"
  ],
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/lib",
    filename: libraryName + ".js",
    publicPath: "/dist/",
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    hot: true,
    compress: false,
    inline: false,
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    headers: {
      "Access-Control-Allow-Origin": "http://0.0.0.0:8080",
      "Access-Control-Allow-Credentials": "true"
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader?modules", "postcss-loader"]
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules|LizardApiClient/
      },
      {
        test: /\.(png|jpg|svg|woff|eot|ttf|otf)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      },
    }),
  ]
};

module.exports = config;
