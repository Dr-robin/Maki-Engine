var express = require("express");

var app = express();

app.get("/", function (req, res) {
	res.send("이게 다 마키 덕분입니다");
});

app.listen(80, function () {
	console.log("Running...");
});