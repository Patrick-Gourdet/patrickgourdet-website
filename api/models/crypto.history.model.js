var mongoose = require('mongoose');
var CryptoHistorySchema = new mongoose.Schema({
  cryptoName: String,
  values:
    [{
      close:  Number,
      high: Number,
      low: Number,
      open: Number,
      time: Number,
      volumefrom: Number,
      volumeto: Number
    }],
  last_update: { type: Date, default: Date.now },
});
module.exports = mongoose.model('CryptoHistory', CryptoHistorySchema);
