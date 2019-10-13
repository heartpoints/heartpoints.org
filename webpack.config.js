const webpack = require("webpack");
const path = require('path');

const localDir = d => path.join(__dirname, d)

module.exports = {
    entry: "./src/frontEnd",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "./dist"),
        publicPath: '/'
    },
    mode: 'development',

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    devtool: 'inline-source-map',


    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    devServer: {
        historyApiFallback: true,
        port: 3002,
        contentBase: ["./dist", "./src/public", "./node_modules"].map(localDir),
        proxy: {
            "/": {
                target: "http://localhost:5001"
            }
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    configFileName: "tsconfig.server.json"
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { 
                test: /\.svg$/,
                include: [/react-images-upload/],
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'React':     'react'
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};