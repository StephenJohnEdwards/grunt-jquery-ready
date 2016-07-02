# grunt-jquery-ready

## ABOUT

If you use JQuery in your projects, then I'm sure you use *$(document).ready(function(){})*.

This grunt task will help you, wrapping your concatenated .js file into *$(document).ready(function(){})*.

## USAGE

#### install
```
npm install grunt-jquery-ready --dev-save
```

#### config

```javascript
grunt.initConfig({
  'jquery-ready' : {
      path: 'public/scrips.js',
      runSync: false
  }

grunt.loadNpmTasks('grunt-jquery-ready');

grunt.registerTask('default', "jquery-ready");
});
```

#### Options

1. *path* - specify path to .js file that you want to have .ready() function
2. *runSync* - If this task should be Run in synchronous way (default: true)


#### run
```grunt```


## Thanks!
