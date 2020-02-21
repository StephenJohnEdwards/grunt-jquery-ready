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

##### for single file

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

##### for multiple input files

```javascript
grunt.initConfig({
  'jquery-ready' : {
    path: ['public/script_one.js', 'public/script_two.js'],
    outputFile: 'public/bundled_ready.js',
    runSync: true
  }
});

grunt.loadNpmTasks('grunt-jquery-ready');

grunt.registerTask('default', 'jquery-ready');
```

##### for multiple output files with multiple input files
```javascript
grunt.initConfig({
  'jquery-ready': {
    path: {
      'public/output_one.js': ['public/script_one.js', 'public/script_two.js'],
      'public/output_two.js': ['public/single_file.js']
    }
  }
});

grunt.loadNpmTasks('grunt-jquery-ready');

grunt.registerTask('default', 'jquery-ready');
```

#### Options

1. *path* - specify path to .js file that you want to have .ready() function, might also be an array of filenames
2. *runSync* - If this task should be Run in synchronous way (default: true)
3. *outputFile* - Specify the output file if you use multiple inputs


#### run
``` grunt ```
