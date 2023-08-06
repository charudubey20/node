var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) {
         console.error(err);
         return;
       }
     // Check if "filetoupload" is an array and get the first element (if available)
  const uploadedFile = files.filetoupload[0];

  // Verify that the uploaded file details are available
  if (!uploadedFile) {
    console.error("No uploaded file found.");
    return;
  }
  const oldPath = uploadedFile.filepath;

       const newpath = 'C:/Users/DubeyC/Ecommerce/' + uploadedFile.originalFilename;

  // Perform the file rename operation
  fs.rename(oldPath, newpath, function (err) {
    if (err) {
      console.error(err);
      return;
    }

    res.write('File uploaded and moved!');
    res.end();
  });
});
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);