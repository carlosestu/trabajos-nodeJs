"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("express-async-errors");
var morgan_1 = require("morgan");
var dotenv_1 = require("dotenv");
var planets_1 = require("./models/planets");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000);
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/planets', function (req, res) {
    res.json(planets_1.planets);
});
app.get('/planets/:id', function (req, res) {
    var id = req.params.id;
    var planet = planets_1.planets.find(function (p) { return p.id === Number(id); });
    res.json(planet);
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.listen(port, function () {
    console.log("Example app listening on port http://localhost:".concat(port));
});
