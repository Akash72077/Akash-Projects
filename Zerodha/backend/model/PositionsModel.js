const { model } = require("mongoose");
const { PositionsModel } = require("../schemas/PositionsSchema");
const PositionsModel = new model("position", PositionsSchema);
module.exports = { PositionsModel };
