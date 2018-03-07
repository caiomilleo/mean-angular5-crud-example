const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    quantity: {type: Number, required: true}
});

module.exports = mongoose.model('Product', ProductSchema);