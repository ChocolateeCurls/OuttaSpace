var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const marketrate = new Schema ({
    ID: ObjectId,
    name: String,
    products: String,
});