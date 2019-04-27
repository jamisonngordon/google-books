let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let BookSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    authors: {
        type: Array,
        required: true
    },

    thumb: {
        type: String,
        required: true
    }

});

// This creates our model from the above schema, using mongoose's model method
let Books = mongoose.model("Books", BookSchema);

// Export the Article model
module.exports = Books;
