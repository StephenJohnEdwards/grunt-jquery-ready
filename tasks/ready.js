'use strict';
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
  grunt.registerTask('jquery-ready', 'Add .ready function on top of your js files', function () {

    let filePath = grunt.config.get("jquery-ready.path"); //get a file path from content
    let runSync = grunt.config.get("jquery-ready.runSync"); //get a file path from content

    if(runSync){
      fs.accessSync(filePath, fs.F_OK); //check if file exist || if not, throw error

      let fileContent = fs.readFileSync(filePath, 'UTF-8'); // read file content and assing it to value

      fileContent = "$(document).ready(function(){\n" + fileContent + "\n});"; // add .ready to content, and close it at the end

      fs.unlinkSync(filePath); //delete current file

      fs.writeFileSync(filePath, fileContent); // create new file
    }
    else {
      var done = this.async();
      let fileContent = "$(document).ready(function(){\n";

      fs.access(filePath, fs.F_OK, function (err) {
        if(err) throw err.Error;
        fs.readFile(filePath, 'UTF-8', function (err, data) {
          if (err) throw err.Error;
          fileContent += data + "\n});";
          fs.unlink(filePath, function (err) {
            if(err) throw err.Error;
            fs.writeFile(filePath, fileContent, function (err) {
              if(err) throw err.Error;
              done();
            });
          });
        })
      });
    }
  });
}
