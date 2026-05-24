const { model } = require("mongoose");
const { PositionsModel } = require("../schemas/PositionsSchema");
const PositionsModel = new model("position", PositionsModel);
module.exports = { PositionsModel };
