#!/usr/bin/env node

var filestocopy = [{
  "resources/android/notification/drawable-hdpi/notification_icon.png":
    "platforms/android/res/drawable-hdpi/ic_stat_onesignal_default.png"
}, {
  "resources/android/notification/drawable-mdpi/notification_icon.png":
    "platforms/android/res/drawable-mdpi/ic_stat_onesignal_default.png"
}, {
  "resources/android/notification/drawable-xhdpi/notification_icon.png":
    "platforms/android/res/drawable-xhdpi/ic_stat_onesignal_default.png"
}, {
  "resources/android/notification/drawable-xxhdpi/notification_icon.png":
    "platforms/android/res/drawable-xxhdpi/ic_stat_onesignal_default.png"
}, {
  "resources/android/notification/drawable-xxxhdpi/notification_icon.png":
    "platforms/android/res/drawable-xxxhdpi/ic_stat_onesignal_default.png"
} ];

var fs = require('fs');
var path = require('path');

// no need to configure below
var rootdir = process.argv[2];

filestocopy.forEach(function(obj) {
  Object.keys(obj).forEach(function(key) {
    var val = obj[key];
    var srcfile = path.join(rootdir, key);
    var destfile = path.join(rootdir, val);
    console.log("copying "+srcfile+" to "+destfile);
    var destdir = path.dirname(destfile);
    if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
      fs.createReadStream(srcfile).pipe(
        fs.createWriteStream(destfile));
    }
  });
});
