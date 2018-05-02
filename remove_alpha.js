var Jimp = require("jimp");
var fs = require('fs');
fs.readdir('resources/ios/icon', function (err, files) {
  files.forEach(function (file) {
    Jimp.read('resources/ios/icon/' + file, function (err, image) {
      if (err) throw err;
      console.log('resources/ios/icon/' + file);
      image.rgba(false).write('resources/ios/icon/' + file);
    });
  });
});
// open a file called "lenna.png"
