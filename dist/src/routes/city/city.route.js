"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.citiesRouter = void 0;
var express_1 = require("express");
var city_model_1 = __importDefault(require("../../models/city/city.model"));
var cities_json_1 = __importDefault(require("../../static/cities.json"));
var router = (0, express_1.Router)();
exports.citiesRouter = router;
//populate cities if empty on first run
city_model_1.default.find().then(function (cities) {
    if (cities.length !== cities_json_1.default.length) {
        console.log("ℹ️  Populating cities collection...");
        city_model_1.default.insertMany(cities_json_1.default);
        console.log("✅ Populating cities collection... Done...");
    }
});
router.get("/", function (req, res) {
    city_model_1.default.find().then(function (cities) {
        res.json({
            records: cities.length,
            success: true,
            data: cities,
        });
    });
});
