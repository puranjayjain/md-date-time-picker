// configuration file has all the src and destination configs for use
module.exports = {
  src: {
    scss: 'src/scss/**/*.scss',
    scssGlob: 'src/scss/**/*',
    scssGlobal: 'src/scss/dependencies/_global.scss',
    images: 'src/images/**/*',
    js: 'src/js/**/*.js',
    svg: 'src/images/**/*.svg',
    temp: 'temp/**/*'
  },
  temp: {
    themes: 'temp/scss/themes/'
  },
  browsers: ['last 4 versions', 'ie >= 6'],
  name: {
    css: 'mdDateTimePicker.css'
  },
  dist: {
    css: 'dist/css/',
    themes: 'dist/css/themes/',
    html: 'dist/*.html',
    images: 'dist/images/',
    js: 'dist/js'
  },
  tasks: [
  	'./gulp/tasks/browserSyncTask.js',
  	'./gulp/tasks/bsReload.js',
  	'./gulp/tasks/cleanDir.js',
  	'./gulp/tasks/default.js',
  	'./gulp/tasks/generateStylesheets.js',
  	'./gulp/tasks/generateThemes.js',
  	'./gulp/tasks/images.js',
  	'./gulp/tasks/initThemes.js',
  	'./gulp/tasks/scripts.js',
  	'./gulp/tasks/styles.js',
  	'./gulp/tasks/themes.js'
  ],
  themeSheet: [{
    color: 'red',
    dark: ': false',
    path: 'light'
  }, {
    color: 'pink',
    dark: ': false',
    path: 'light'
  }, {
    color: 'purple',
    dark: ': false',
    path: 'light'
  }, {
    color: 'deep-purple',
    dark: ': false',
    path: 'light'
  }, {
    color: 'indigo',
    dark: ': false',
    path: 'light'
  }, {
    color: 'blue',
    dark: ': false',
    path: 'light'
  }, {
    color: 'light-blue',
    dark: ': false',
    path: 'light'
  }, {
    color: 'cyan',
    dark: ': false',
    path: 'light'
  }, {
    color: 'green',
    dark: ': false',
    path: 'light'
  }, {
    color: 'light-green',
    dark: ': false',
    path: 'light'
  }, {
    color: 'lime',
    dark: ': false',
    path: 'light'
  }, {
    color: 'yellow',
    dark: ': false',
    path: 'light'
  }, {
    color: 'amber',
    dark: ': false',
    path: 'light'
  }, {
    color: 'orange',
    dark: ': false',
    path: 'light'
  }, {
    color: 'deep-orange',
    dark: ': false',
    path: 'light'
  }, {
    color: 'brown',
    dark: ': false',
    path: 'light'
  }, {
    color: 'grey',
    dark: ': false',
    path: 'light'
  }, {
    color: 'blue-grey',
    dark: ': false',
    path: 'light'
  }, {
    color: 'teal',
    dark: ': false',
    path: 'light'
  },
  {
    color: 'red',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'pink',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'purple',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'deep-purple',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'indigo',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'blue',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'light-blue',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'cyan',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'green',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'light-green',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'lime',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'yellow',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'amber',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'orange',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'deep-orange',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'brown',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'grey',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'blue-grey',
    dark: ': true',
    path: 'dark'
  }, {
    color: 'teal',
    dark: ': true',
    path: 'dark'
  }]
};
