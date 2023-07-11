#!/usr/bin/env node


var fs = require('fs');
var path = require('path');

function listXmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      listXmlFiles(filePath, fileList); // Recursively call for subdirectories
    } else if (path.extname(filePath) === '.xml') {
      fileList.push(filePath); // Add XML file path to the list
    }
  });

  return fileList;
}



module.exports = function(context) {



  var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
  var manifestFile = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');

  console.log("Platform ROOT: " + platformRoot);
  console.log("Manifest file: " + manifestFile);

  console.log("LISTING FILES");
  const xmlFiles = listXmlFiles(platformRoot);
  console.log(xmlFiles);

  

  // If manifest file exists
  if (fs.existsSync(manifestFile)) {
    console.log("Manifest file exists");

    // Read manifest file
    fs.readFile(manifestFile, 'utf8', function (err, data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      console.log("output XML content");
      console.log(data);

      console.log("index of sensorLandscape before:" + data.indexOf('sensorLandscape'));

      // Replace 'sensorLandscape' with 'fullSensor'
      data = data.replace(/sensorLandscape/g, 'fullSensor');

      console.log("index of sensorLandscape after:" + data.indexOf('sensorLandscape'));
      console.log("index of fullSensor after:" + data.indexOf('sensorLandscape'));
      
      throw new Error('error test');
      // Replace manifest file with updated version
      if(data){
        fs.writeFile(manifestFile, data, 'utf8', function (err) {
          if (err) throw new Error('Unable to write AndroidManifest.xml: ' + err);
        })
      }
    });
  } else {
    console.log("Manifest file DOES NOT exist");
    throw new Error('Unable to find AndroidManifest.xml');
  }
};