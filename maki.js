var express = require("express"),
	fs = require("fs"),
	mysql = require("node-mysql"),
	ejs = require("ejs");

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
	global.loadModule("setup");
}

app.set("view engine", "ejs");

global.app = app;
global.sql = sql;
global.loadModule = function(moduleName) {
	if(!listModule[moduleName]) {
		listModule[moduleName] = require("./module/" + moduleName + "/module.js");
	}
	return listModule[moduleName];
};

app.listen(80, function() {
	console.log("Running...");
});