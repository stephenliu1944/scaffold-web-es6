var path = require('path');
var fs = require('fs');
var mock = require("mockjs");
var app = require('express')();
var port = process.argv.slice(2)[0] || 8088;

var server = app.listen(port, function () {
    console.info('Mock server is listening at ' + port);
});


var api = {};
var apiPath = path.join(__dirname, './api.json');

function getApis() {
    fs.readFile(apiPath, 'utf-8', function (err, content) {
        api = JSON.parse(content);
    });
}
fs.watchFile(apiPath, function (curr) {
    console.log('API is updated.', curr.mtime);
    getApis();
});

getApis();


var express = require('express');
const prefix = '';

app.use(prefix, express.static(__dirname));

app.all(prefix + '/~m/all', function (req, res) {
    res.contentType("application/json;charset=UTF-8");
    res.send(JSON.stringify(api));
});

app.all(prefix + '/~m', function (req, res) {
    res.sendFile(__dirname + '/asset/api.html');
});


app.set('jsonp callback name', 'callback');

app.use(function (req, res) {
    var data = undefined;
    var delay = 0;
    for (var group in api) {
        if (api[group].find(function (reqData) {
                if (reqData.regex) { 
                    if (!new RegExp(reqData.url).test(req.originalUrl)) {
                        return false;
                    }
                } else if (req.originalUrl.indexOf(prefix + reqData.url) !== 0) {
                    return false;
                }
                var apiRes = reqData.res;
                data = reqData.mock ? mock.mock(apiRes) : apiRes;
                delay = reqData.delay || 0;
                return true;
            }) !== undefined) {
            break;
        }
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    data !== undefined ? setTimeout(() => res.jsonp(data), delay) : res.sendStatus(404);
});