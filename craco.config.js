module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        historyApiFallback: true,
        hot: true,
        client: {
          overlay: false,
        },
      };
      return webpackConfig;
    }
  }
}