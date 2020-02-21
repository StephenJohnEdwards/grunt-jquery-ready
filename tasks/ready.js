'use strict';
var fs = require('fs');
var fsPromises = require('fs').promises;

module.exports = function (grunt) {

  const doFiles = async (files, outfile) => {
    try {
      let fileContent = "$(document).ready(function(){\n";
      for(let fn of files){
        let data = await fsPromises.readFile(fn, 'UTF-8');
        fileContent += data + "\n";
      }
      fileContent += "});";
      await fsPromises.writeFile(outfile, fileContent);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const doFilesMultiOut = async(destWithFiles) => {
    try {
      for(let dest of destWithFiles){
        let fileContent = "$(document).ready(function(){\n";
        for(let fn of dest[1]){
            let data = await fsPromises.readFile(fn, 'utf-8');
            fileContent += data + '\n';
        }
        fileContent += "});\n";
        await fsPromises.writeFile(dest[0], fileContent);
      }
    }
    catch(e)
    {
      console.error(e);
    }
  }

  grunt.registerTask('jquery-ready', 'Add .ready function on top of your js files', function () {

    let outFile = grunt.config.get("jquery-ready.outputFile") // get the output file path 
    let filePath = grunt.config.get("jquery-ready.path"); //get a file path from content
    let runSync = grunt.config.get("jquery-ready.runSync"); //get a file path from content

    if(runSync){
      if(Array.isArray(filePath) || typeof filePath == 'string'){
        let fileContent = "";
        if(Array.isArray(filePath))
        {
          for(let i = 0; i < filePath.length; i++)
          {
            fs.accessSync(filePath[i], fs.F_OK);
            fileContent += fs.readFileSync(filePath[i], 'UTF-8') + '\n';
          }
        }
        else
        {
  
          fs.accessSync(filePath, fs.F_OK); //check if file exist || if not, throw error
          fileContent = fs.readFileSync(filePath, 'UTF-8'); // read file content and assing it to value
          fs.unlinkSync(filePath); //delete current file
        }
        fileContent = "$(document).ready(function(){\n" + fileContent + "\n});"; // add .ready to content, and close it at the end
  
        if(outFile)
        {
          fs.writeFileSync(outFile, fileContent); // create new file
        }
        else
        {
          fs.writeFileSync(filePath, fileContent);
        }
      }
      else
      {
        var objectEntries = Object.entries(filePath);
        let fileContent = "";
        for(let entry of objectEntries){
          let destFile = entry[0];
          for(let file of entry[1])
          {
            fs.accessSync(file, fs.F_OK);
            fileContent += fs.readFileSync(file, 'UTF-8') + '\n';
          }
          fileContent = "$(document).ready(function(){\n" + fileContent + "\n});";
          fs.writeFileSync(destFile, fileContent);
        }
      }
    }
    else
    {

      var done = this.async();
      if(Array.isArray(filePath) || typeof filePath === 'string')
      {
        if(Array.isArray(filePath))
        {
          doFiles(filePath, outFile).then(done).catch(console.log);
        }
        else
        {
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
      }
      else
      {
        let objectEntries = Object.entries(filePath);
        doFilesMultiOut(objectEntries).then(done).catch(console.log);
      }
    }
  });
}
