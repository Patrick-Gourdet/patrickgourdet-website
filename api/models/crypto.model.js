var mongoose = require('mongoose');

var CryptoSchema = new mongoose.Schema({
    cryptoName: String,
    amount: Number,
    cryptoName2: String,
    amount2: Number,
    cryptoName3: String,
    amount3: Number,
    cryptoName4: String,
    amount4: Number,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Crypto', CryptoSchema);
