# Inject Inline Html Webpack Plugin

[![Continuous Integration](https://github.com/tophat/inject-inline-html-webpack-plugin/workflows/Continuous%20Integration/badge.svg?branch=next%2Fv2)](https://github.com/tophat/inject-inline-html-webpack-plugin/actions?query=workflow%3A%22Continuous+Integration%22)
[![codecov](https://codecov.io/gh/tophat/inject-inline-html-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/tophat/inject-inline-html-webpack-plugin)
[![Maturity badge - level 2](https://img.shields.io/badge/Maturity-Level%202%20--%20First%20Release-yellowgreen.svg)](https://github.com/tophat/getting-started/blob/master/scorecard.md)
[![GitHub license](https://img.shields.io/github/license/tophat/inject-inline-html-webpack-plugin)](https://github.com/tophat/inject-inline-html-webpack-plugin/blob/master/LICENSE)
[![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![node-current](https://img.shields.io/node/v/inject-inline-html-webpack-plugin)
[![npm](https://img.shields.io/npm/v/inject-inline-html-webpack-plugin.svg)](https://www.npmjs.com/package/inject-inline-html-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dm/inject-inline-html-webpack-plugin.svg)](https://npm-stat.com/charts.html?package=inject-inline-html-webpack-plugin)

## Overview

This Webpack plugin provide a way to inject inline chunks into the HTML file generated by the html-webpack-plugin. It differs from some other inline html webpack plugins in that the script to inject does not need to be specified as an explicit chunk or entry point. Further, the injected script is built according to the webpack loaders, and is not inlined raw.

**Only Webpack 5 is supported.**

## Installation

```sh
yarn add -D inject-inline-html-webpack-plugin
```

Then instantiate the plugin after the HtmlWebpackPlugin, and specify a `inlineScripts` in the html-webpack-plugin config:

```
plugins: [new HtmlWebpackPlugin({ inlineScripts: ['some-script.js'] }), new InjectInlineHtmlWebpackPlugin()]
```

## Contributing

Contributions are welcome!

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://noahnu.com"><img src="https://avatars.githubusercontent.com/u/1297096?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Noah</b></sub></a><br /><a href="#ideas-noahnu" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/tophat/inject-inline-html-webpack-plugin/commits?author=noahnu" title="Code">💻</a> <a href="#infra-noahnu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

To add a contributor to the README, signal the [all-contributors](https://allcontributors.org/) bot by adding comments in your PRs like so:

```
@all-contributors please add <username> for <contribution type>
```
