#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = function (context) {
  const platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
  const manifestFile = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');

  console.log("Platform Root:", platformRoot);
  console.log("Manifest File:", manifestFile);

  // Check if manifest file exists
  if (fs.existsSync(manifestFile)) {
    console.log("Manifest file exists");

    // Read manifest file
    fs.readFile(manifestFile, 'utf8', function (err, data) {
      if (err) {
        throw new Error('Unable to read AndroidManifest.xml: ' + err);
      }

      // Replace 'sensorLandscape' with 'fullSensor'
      data = data.replace(/sensorLandscape/g, 'fullSensor');

      // Write updated manifest file
      fs.writeFile(manifestFile, data, 'utf8', function (err) {
        if (err) {
          throw new Error('Unable to write AndroidManifest.xml: ' + err);
        }
        console.log("AndroidManifest.xml updated successfully!");
      });
    });
  } else {
    console.log("Manifest file does not exist");
    throw new Error('Unable to find AndroidManifest.xml');
  }
};
