const path = require("path");
const copy = require("copy-webpack-plugin");
const extract = require("mini-css-extract-plugin");
const fs = require("fs");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var externals = {
    cockpit: "cockpit",
};

/* These can be overridden, typically from the Makefile.am */
const srcdir = (process.env.SRCDIR || __dirname) + path.sep + "src";
const builddir = (process.env.SRCDIR || __dirname);
const distdir = builddir + path.sep + "dist";
const section = process.env.ONLYDIR || null;
const nodedir = path.resolve((process.env.SRCDIR || __dirname), "node_modules");

/* A standard nodejs and webpack pattern */
var production = process.env.NODE_ENV === 'production';

var info = {
    entries: {
        index: [
            "./index.js"
        ],

        "computer/index": [
            "./computer/index.js",
        ],

        "domain/index": [
            "./domain/index.js"
        ],

        "contact/index": [
            "./contact/index.js"
        ],

        "time/index": [
            "./time/index.js"
        ],

        "sites/index": [
            "./sites/index.js"
        ],

        "user/index": [
            "./user/index.js"
        ],

        "organization_unit/index": [
            "./organization_unit/index.js"
        ],

        "forest/index": [
            "./forest/index.js"
        ],

        "group/index": [
            "./group/index.js"
        ],

        "dns/index": [
            "./dns/index.js"
        ],

        "delegation/index": [
            "./delegation/index.js"
        ],

        "spn/index": [
            "./spn/index.js"
        ],

        "fsmo/index": [
            "./fsmo/index.js"
        ],

        "gpo/index": [
            "./gpo/index.js"
        ],

        "dsacl/index": [
            "./dsacl/index.js"
        ],

        "ntacl/index": [
            "./ntacl/index.js"
        ]
    },
    files: [
        "css",
        "index.html",
        "computer/computer.html",
        "domain/domain.html",
        "contact/contact.html",
        "time/time.html",
        "sites/sites.html",
        "user/user.html",
        "organization_unit/orgunit.html",
        "forest/forest.html",
        "group/group.html",
        "dns/dns.html",
        "delegation/delegation.html",
        "spn/spn.html",
        "fsmo/fsmo.html",
        "gpo/gpo.html",
        "dsacl/dsacl.html",
        "ntacl/ntacl.html",
        "manifest.json",
    ],
};

var output = {
    path: distdir,
    filename: "[name].js",
    sourceMapFilename: "[file].map",
};

/*
 * Note that we're avoiding the use of path.join as webpack and nodejs
 * want relative paths that start with ./ explicitly.
 *
 * In addition we mimic the VPATH style functionality of GNU Makefile
 * where we first check builddir, and then srcdir.
 */

function vpath(/* ... */) {
    var filename = Array.prototype.join.call(arguments, path.sep);
    var expanded = builddir + path.sep + filename;
    if (fs.existsSync(expanded))
        return expanded;
    expanded = srcdir + path.sep + filename;
    return expanded;
}

/* Qualify all the paths in entries */
Object.keys(info.entries).forEach(function(key) {
    if (section && key.indexOf(section) !== 0) {
        delete info.entries[key];
        return;
    }

    info.entries[key] = info.entries[key].map(function(value) {
        if (value.indexOf("/") === -1)
            return value;
        else
            return vpath(value);
    });
});

/* Qualify all the paths in files listed */
var files = [];
info.files.forEach(function(value) {
    if (!section || value.indexOf(section) === 0)
        files.push({ from: vpath(value), to: value });
});
info.files = files;

var plugins = [
    new copy(info.files),
    new extract({ filename: "[name].css" }),
    new MiniCssExtractPlugin()
];

/* Only minimize when in production mode */
if (production) {
    /* Rename output files when minimizing */
    output.filename = "[name].min.js";

    plugins.unshift(new CompressionPlugin({
        asset: "[path].gz[query]",
        test: /\.(js|html)$/,
        minRatio: 0.9,
        deleteOriginalAssets: true
    }));
}

var babel_loader = {
    loader: "babel-loader",
    options: {
        presets: [
            ["@babel/env", {
                targets: {
                    chrome: "57",
                    firefox: "52",
                    safari: "10.3",
                    edge: "16",
                    opera: "44"
                }
            }],
            "@babel/preset-react"
        ]
    }
};

module.exports = {
    mode: production ? 'production' : 'development',
    resolve: {
        modules: [ nodedir ],
    },
    entry: info.entries,
    externals: externals,
    output: output,
    devtool: "source-map",
    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                test: /\.(js|jsx)$/
            },
            {
                exclude: /node_modules/,
                use: babel_loader,
                test: /\.(js|jsx)$/
            },
            /* HACK: remove unwanted fonts from PatternFly's css */
            {
                test: /patternfly-4-cockpit.scss$/,
                use: [
                    extract.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                {
                                    search: /src:url\("patternfly-icons-fake-path\/pficon[^}]*/g,
                                    replace: "src:url('fonts/patternfly.woff')format('woff');",
                                },
                                {
                                    search: /@font-face[^}]*patternfly-fonts-fake-path[^}]*}/g,
                                    replace: '',
                                },
                            ]
                        },
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed',
                        },
                    },
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /patternfly-4-cockpit.scss/,
                use: [
                    extract.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed',
                        },
                    },
                ]
            },
        ]
    },
    plugins: plugins
};
