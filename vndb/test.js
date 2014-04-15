var fs = require('fs');
var mongoose = require('mongoose');
var http = require('http');
var db = mongoose.connect('mongodb://localhost/vndb');
var Blob = require('./models/blob.js');

// var options = {
// 		host : 'vndb.kemege.com',
// 		port : 80,
// 		path : '/data?key=' + 'AMIfv975pUxzurIuesDInHsfnAb0eC_p2DEtVao3c1QtpTD6Zc5fdDq9Ybpm6FzfSurDh7enrbHafHIKgTFQQOm0NfcOCLBPNfGGYkhtYw91B3xlIFkrfDmITT_2c92Fl2Q1HG3pIEAdGQRU6F3HeLA16Wfv4hJSMQ'
// 	};
// var request = http.get(options);
// var blobData = {};
// request.on('response', function (res) {
// 	var imageData = '';
// 	res.setEncoding('binary');
// 	res.on('data', function(chunk) {
// 		imageData += chunk;
// 	});
// 	res.on('end', function () {
// 		// fs.writeFile('test.jpg', imageData, 'binary');
// 		b = new Blob({
// 			name: 'test',
// 			body: new Buffer(imageData),
// 			mime: 'image/jpeg'
// 		});
// 		b.save();
// 	});
// });

Blob.findOne({ _id: '534a8d474dd3aaac33bfb3f6' }, function (err,doc) {
	console.log(doc.body);
	fs.writeFile('test2.jpg', doc.body.toString('utf8'), 'binary');
	return 0;
});

