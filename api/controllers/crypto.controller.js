var mongoose = require("mongoose");
var crypto = require("../models/crypto.model");

var cryptoController = {};

// Show last crypto entered
cryptoController.list = function(req, res) {
    crypto.findOne().sort({'updated_at': -1}).exec(function (err, cryptocurr) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.json( {cryptocurr: cryptocurr} );
        }
    });
};

// For later use if desiered
cryptoController.show = function(req, res) {
    crypto.findOne({_id: req.params.id}).exec(function (err, cryptocurr) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.json( {cryptocurr: cryptocurr});
        }
    });
};

// Save new Currency
cryptoController.create = function(req, res) {
  console.log(req.body);
    var cyptoCurr = new crypto(req.body);
    console.log(cyptoCurr);
  console.log(crypto);
  cyptoCurr.save(function(err) {
        if(err) {
            console.log(err);
            res.json(err);
        } else {
            console.log("Successfully stored Cyto Currencies.");
            console.log('what ')
        }
    });
};



// Update an Currency
cryptoController.update = function(req, res) {
  cyptoCurr.findByIdAndUpdate(req.params.id, { $set: { cryptoName: req.body.cryptoName, amount: req.body.amount, cryptoName2: req.body.cryptoName2, amount2: req.body.amount2,
            cryptoName3: req.body.cryptoName3, amount3: req.body.amount3,cryptoName4: req.body.cryptoName4, amount4: req.body.amount4}}, { new: true }, function (err, employee) {
        if (err) {
            console.log(err);
            res.json({crypto: req.body});
        }
    });
};

// Delete an Currency
cryptoController.delete = function(req, res) {
  cyptoCurr.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Crypto deleted!");
        }
    });
};

module.exports = cryptoController;
