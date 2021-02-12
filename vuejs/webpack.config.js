const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const SitemapPlugin = require('sitemap-webpack-plugin').default
const CopyPlugin = require("copy-webpack-plugin")
module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,"build"),
        filename: 'app.js'
    },module:{
        rules:[
            {
                test: /\.js$/i,
                exclude:'/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                    presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.vue$/i,
                use: ['vue-loader']
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins : [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css",
        }),
        new SitemapPlugin(
            { 
            base: 'http://zsh.zle.lc/', 
            paths: [
                {
                    path: 'http://zsh.zle.lc/',
                    lastmod: '2020-10-18',
                    priority: 0.5,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zsh.zle.lc/',
                    lastmod: '2021-01-01',
                    priority: 0.5,
                    changefreq: 'monthly'
                },
                {
                    path:'http://zle.lc',
                    lastmod: '2021-01-21',
                    priority: 0.9,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zle.lc',
                    lastmod: '2021-01-21',
                    priority: 0.9,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zle.lc/downloads/',
                    lastmod: '2021-01-21',
                    priority: 0.9,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zle.lc/zsh-questions-usa.html',
                    lastmod: '2021-01-03',
                    priority: 0.4,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zle.lc/example/zsh-minimal-zshrc.txt',
                    lastmod: '2021-01-01',
                    priority: 0.4,
                    changefreq: 'monthly'
                },
                {
                    path:'https://zle.lc/example/zsh-minimal-aliasrc.txt',
                    lastmod: '2021-01-01',
                    priority: 0.4,
                    changefreq: 'monthly'
                }
            ],
            options:{
                filename: 'sitemap.xml' 
        }}) ,
        new CopyPlugin({
            patterns: [
              { from:  path.resolve(__dirname,"src/img"), to: path.resolve(__dirname,"build/img") }
            ]
          })
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
            sourceMap: true
          }),
          new TerserPlugin({
            test: /\.js(\?.*)?$/i
          })
        ]
    }
}