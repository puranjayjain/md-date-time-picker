// configuration file has all the src and destination configs for use
module.exports = {
  src: {
    images: 'src/images/*',
    favicons: ['src/favicons/*.png', 'src/favicons/*.ico'],
    js: ['src/js/material.min.js', 'src/js/moment.min.js', 'src/js/draggabilly.pkgd.min.js', 'src/js/highlight.pack.js', 'src/js/mdDateTimePicker.min.js', 'src/js/main.js'],
    scss: 'src/scss/**/*.scss',
    css: ['src/css/material.min.css', 'src/css/main.css', 'src/css/md-date-time-picker.min.css'],
    njk: 'src/templates/pages/*.njk',
    templates: 'src/templates/'
  },
  browsers: ['last 4 versions', 'ie >= 6']
};
