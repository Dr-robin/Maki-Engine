var express = require("express"),
	fs = require("fs"),
	mysql = require("node-mysql");

var app = express();
var listModule = {};
var sql;
var tablePrefix = "";
var isUsable = false; // 설치되지 않았으면 false

var config = {};
if(fs.existsSync("config.json")) {
	config = JSON.parse(fs.readFileSync("config.json", "utf8"));
	if(config.version >= 1) {
		sql = mysql.createPool({connectionLimit: config.sql.limit, host: config.sql.host, user: config.sql.user, password: config.sql.password, database: config.sql.database});
		tablePrefix = config.sql.prefix;
		isUsable = true;
	}
	else {
		console.log("설정파일이 잘못되었습니다.");
	}
}
else {
	console.log("설정파일을 찾을 수 없습니다.");
}

global.loadModule = function(moduleName) {
	if(!listModule[moduleName]) {
		listModule[moduleName] = require("./module/" + moduleName + "/module.js");
		listModule[moduleName].init();
	}
};

app.get("/", function(req, res) {
	if(isUsable) {
		//기본모듈을 불러와야 합니다.
	}
	else {
		//초기 설정, 모듈 다운로드 등을 해야 합니다.
	}
});
app.get("*", function(req, res) {
	// 여기에서 req.path의 값을 조사해서 적당한 모듈을 불러옵니다.
});

app.listen(80, function() {
	console.log("Running...");
});