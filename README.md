# md-date-time-picker

[![Dependency Status](https://david-dm.org/puranjayjain/md-date-time-picker.svg)](https://david-dm.org/puranjayjain/md-date-time-picker)

[![Maintenance](https://img.shields.io/maintenance/yes/2016.svg)]()
[![Issues](https://img.shields.io/github/issues/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/issues)
[![Forks](https://img.shields.io/github/forks/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/network)
[![Stars](https://img.shields.io/github/stars/puranjayjain/md-date-time-picker.svg)](https://github.com/puranjayjain/md-date-time-picker/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/puranjayjain/md-date-time-picker/master/LICENSE.md)

Share the :heart: !

[![Twitter](https://img.shields.io/twitter/url/https/github.com/puranjayjain/md-date-time-picker.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

> An implementation of [Material Design Picker](https://www.google.com/design/spec/components/pickers.html)
components in vanilla CSS, JS, and HTML

## Browser Support

Supported evergreen browsers:

- Chrome
- Edge
- Firefox
- Opera

Supported versioned browsers:

- Internet Explorer 8
- Safari 8
- Mobile Safari 8

## Dependency

### Moment
Why? because parsing dates correctly is not every browser's cup of :tea: and also according to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard
Moreover, timezones are also an important aspect of date which is an important parameter.

ok. Not satisfied with the answer?

Let's take an example:

```js
  new Date('1/10/2016')
```

What should it output? ... well it is interpreted as 1st October 2016 in some browsers and 10th January 2016 in some [Refer Me](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse).

### What's included

In the repo you'll find the following directories and files.

| File/Folder     | Provides                                       |
|-----------------|------------------------------------------------|
| CONTRIBUTING.md | contribution guidelines.                       |
| gulpfile.js     | gulp configuration.                            |
| LICENSE         | Project license information.                   |
| package.json    | npm package information.                       |
| README.md       | Details for quickly understanding the project. |
| src             | Source code.                                   |
| dist            | Distributable code.                            |
| test            | Project test files.                            |

### Build

To get started modifying the components or the docs, first install the necessary
dependencies, from the root of the project:

```bash
npm install
```

After successfully installing the above components

```bash
gulp default
```

Most changes made to files inside the `src` directory will cause the page to reload. This page can also be loaded up on physical devices thanks to BrowserSync.

## Versioning

For transparency into our release cycle and in striving to maintain backward
compatibility, Material Design Lite is maintained under
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw up,
but we'll adhere to those rules whenever possible.

## License

© Puranjay Jain, 2016. Licensed under an
[MIT License](https://github.com/puranjayjain/md-date-time-picker/blob/master/LICENSE.md)
license.
