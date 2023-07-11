#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const manifestPath = 'platforms/android/app/src/main/AndroidManifest.xml';
const captureActivity = 'com.journeyapps.barcodescanner.CaptureActivity';

const manifestFile = path.join(__dirname, '..', manifestPath);

fs.readFile(manifestFile, 'utf8', (err, data) => {
  if (err) {
    throw new Error(`Unable to read ${manifestPath}: ${err}`);
  }

  const modifiedData = data.replace(
    `android:screenOrientation="sensorLandscape"`,
    `android:screenOrientation="fullSensor"`
  );

  fs.writeFile(manifestFile, modifiedData, 'utf8', (err) => {
    if (err) {
      throw new Error(`Unable to write ${manifestPath}: ${err}`);
    }
    console.log(`Updated ${manifestPath} successfully!`);
  });
});
