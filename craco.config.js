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
    configure: (webpackConfig, { env, paths }) => {
      // Configuração para suportar o React Router
      webpackConfig.devServer = {
        ...webpackConfig.devServer,
        historyApiFallback: {
          disableDotRule: true,
          index: '/',
        },
        hot: true,
        open: true,
        port: 3000,
      };

      // Adiciona fallback para arquivos estáticos
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/',
      };

      return webpackConfig;
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    }
  }
}