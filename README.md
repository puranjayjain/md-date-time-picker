# md-date-time-picker

[![Gitter](https://badges.gitter.im/puranjayjain/md-date-time-picker.svg)](https://gitter.im/puranjayjain/md-date-time-picker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![GitHub version](https://img.shields.io/github/release/puranjayjain/md-date-time-picker.svg)](https://badge.fury.io/gh/puranjayjain%2Fmd-date-time-picker)
[![npm version](https://img.shields.io/npm/v/md-date-time-picker.svg)](https://badge.fury.io/js/md-date-time-picker)
[![Bower version](https://img.shields.io/bower/v/md-date-time-picker.svg)](https://badge.fury.io/bo/puranjayjain%2Fmd-date-time-picker)
[![Dependency Status](https://david-dm.org/puranjayjain/md-date-time-picker.svg)](https://david-dm.org/puranjayjain/md-date-time-picker)

[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)]()
[![Issues](https://img.shields.io/github/issues/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/issues)
[![Forks](https://img.shields.io/github/forks/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/network)
[![Stars](https://img.shields.io/github/stars/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/puranjayjain/md-date-time-picker/master/LICENSE.md)

Share the :heart: !

[![Twitter](https://img.shields.io/twitter/url/https/github.com/puranjayjain/md-date-time-picker.svg?style=social)](https://twitter.com/intent/tweet?text=check%20out&url=https://puranjayjain.github.io/md-date-time-picker&via=puranjayjain)
[![Google Plus](https://www.gstatic.com/images/icons/gplus-16.png)](https://plus.google.com/share?url=https://puranjayjain.github.io/md-date-time-picker)
[![Facebook](https://github.com/puranjayjain/md-date-time-picker/blob/master/src/images/FB-f-Logo__blue_29.png)](https://www.facebook.com/sharer.php?u=https://puranjayjain.github.io/md-date-time-picker&media=https://puranjayjain.github.io/md-date-time-picker/favicon-128.png&description=An%20implementation%20of%20Material%20Design%20Picker%20components%20in%20vanilla%20CSS,%20JS,%20and%20HTML)

:heart: the package? Then :star: it!

> An implementation of [Material Design Picker](https://www.google.com/design/spec/components/pickers.html)
components in vanilla CSS, JS, and HTML

##Documentation

The Documentation is at [https://puranjayjain.github.io/md-date-time-picker](https://puranjayjain.github.io/md-date-time-picker)

## Browser Support

Supported evergreen browsers:

- Chrome (and Chrome for Android)
- Edge
- Firefox
- Opera

Supported versioned browsers:

- Internet Explorer 8+
- Safari 8+
- Mobile Safari 8+
- Android Browser 4.3+

## Dependency

### Moment
Why? because parsing dates correctly is not every browser's cup of :tea: and also according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard

Moreover, it makes dealing with timezones easier.

ok. Not satisfied with the answer?

Let's take an example:

```js
  new Date('1/10/2016')
```

What should it output? ... well it is interpreted as 1st October 2016 in some browsers and 10th January 2016 in some.

For more information refer [link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).

### Draggabilly

This is an optional dependency if you want to make the dial draggable in time picker in minute which makes it useful there to select values which are not a divisor of 5 (e.g 3, 6) or in layman terms the values which come between 5, 10, 15, etc.

### What's included

In the repo you'll find the following directories and files.

| File/Folder     | Provides                                                                 |
|-----------------|--------------------------------------------------------------------------|
| .github         | Contains CONTRIBUTING.md, ISSUE_TEMPLATE.md and PULL_REQUEST_TEMPLATE.md |
| gulpfile.js     | gulp configuration.                                                      |
| LICENSE.md      | Project license information.                                             |
| package.json    | npm package information.                                                 |
| bower.json      | bower package information.                                               |
| README.md       | Details for quickly understanding the project.                           |
| src             | Source code.                                                             |
| dist            | Distributable code.                                                      |
| test            | Project test files.                                                      |

### Build

To get started modifying the components or the docs, first install the necessary
dependencies, from the root of the project:

```bash
npm install
```

After successfully installing the above components

```bash
./node_modules/gulp default
```

Most changes made to files inside the `src` directory will cause the page to reload. This page can also be loaded up on physical devices thanks to BrowserSync.

## Tests

```bash
$ npm run cs:scss //lint all scss files
$ npm run cs:js //lint and fix all js files
$ npm run cs //run both cs jobs
```
## Versioning

For transparency into our release cycle and in striving to maintain backward
compatibility, this project is maintained under
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up,
but we'll adhere to those rules whenever possible.

## License

© Puranjay Jain, 2016. Licensed under an
[MIT License](https://github.com/puranjayjain/md-date-time-picker/blob/master/LICENSE.md).
