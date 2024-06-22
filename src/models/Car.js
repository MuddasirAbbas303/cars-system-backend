const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    color: { type: String, required: true },
    model: { type: String, required: true },
    make: { type: String, required: true },
    registration_no: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Car', carSchema);