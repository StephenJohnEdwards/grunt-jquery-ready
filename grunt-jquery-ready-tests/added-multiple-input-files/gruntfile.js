module.exports = (grunt) => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'jquery-ready': {
            path: {
                'testresults/results.js': ['testfiles/first.js', 'testfiles/second.js'],
                'testresults/results_second.js': ['testfiles/first.js', 'testfiles/second.js']
            },
            runSync: false
        }
    });
    grunt.loadNpmTasks('grunt-jquery-ready');
    grunt.registerTask('test', ['jquery-ready:test']);
}