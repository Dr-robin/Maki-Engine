var express = require("express"),
	fs = require("fs");

var app = express();
var listModule = [];

var config = {};
if(fs.existsSync("config.json")) {
	config = JSON.parse(fs.readFileSync("config.json", "utf8"));
	listModule = config.modules;
}
else {
	console.log("설정파일을 찾을 수 없습니다.");
}

app.get("/", function (req, res) {
	res.send("이게 다 마키 덕분입니다");
});

app.listen(80, function () {
	console.log("Running...");
});