const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          'primary-color': '#87CEFA',//'#F5222D',//全局主色
          'link-color': '#3a91db',//'#F5222D',//链接色
          'border-radius-base': '5px',//组件 浮层圆角
          'font-family':'Microsoft YaHei'
        },
        // do not remove this line
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'http://172.22.0.8:8088',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //
    //     }
    //   }
    // }
    proxy: {
      '/api': {
        // 测试环境
        target: 'http://172.22.0.8:8088',  // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': ''   //需要rewrite重写的,
        }
      },
      '/files': {
        target: 'http://localhost:8088',  // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/files': ''   //需要rewrite重写的,
        }
      },
      '/arcgis': {
        target: 'http://172.22.0.4:6080/arcgis/',  // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/arcgis': ''   //需要rewrite重写的,
        }
      },
    },
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
