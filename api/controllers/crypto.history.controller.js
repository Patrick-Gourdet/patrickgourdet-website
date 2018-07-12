var mongoose = require("mongoose");
// var http = require('http');
var requestify = require('requestify');
var cryptoHistory = require("../models/crypto.history.model");
// var options = {
//   host: 'https://min-api.cryptocompare.com',
//   path:'/data/histoday?fsym=$BTC&tsym=USD&limit=300',
// };
var history;
var cryptoHistoryController = {};

// Show last crypto entered
cryptoHistoryController.list = function(req, res) {
  cryptoHistory.find({}).exec(function (err, cryptocurr) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.json( {cryptocurr: cryptocurr} );
    }
  });
};

// For later use if desiered
cryptoHistoryController.pre = function(req, res) {
  console.log("THIS IS BACKEND");
  console.log(req.body);
  cryptoHistory.findOne({_id: req.params.id}).exec(function (err, cryptocurr) {
    if (err) {
      console.log("Error:", err);
      cryptoHistoryController.create(req,res);
    }
    else {
      cryptoHistoryController.update(req,res);
    }
  });
};

// Save new Currency
cryptoHistoryController.create = function(req, res) {
  console.log("IN CREATE");
  // console.log(req.body.Data);
  var cyptoCurrHist = new cryptoHistory(req.body);
  // console.log(cryptoHist.cryptoName);
  console.log(req.body.requesting);
// TODO NEEW TO MAKE UPDATE INTEAD OF SAVE
  cyptoCurrHist.findOne(({"cryptoName":req.body.requesting},{values:{$slice:1}}).exec(function (err, cryptocurr) {
    // If there is not an entry for that currencie in the data base create one.
    if (err) {
      console.log("Error:", err);
      // //Check if there is data to save
      if (!cyptoCurrHist === undefined) {
        try {
          requesting = req.body.requesting;
          requestify.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${requesting}&tsym=USD&limit=300`).then(function (data) {
            // crytpoCurrHist.cryptoName = 'BTC', cyptoCurrHist.values = data.gerBody.Data;
            console.log(data.getBody());
          })
          ;
        } catch (err) {

        }
        //   saving(cyptoCurrHist);
      }

      // }else{
      //   console.log("FOUND IT");
      //   var dateCompare = new Date() ;
      //   var s = Date.parse(dateCompare);
      //   var n = Date.parse(cryptocurr.last_update);
      //   n = n + 24 * 60 * 60 * 1000;
      //   //dateCompare =  new Date(dateCompare);
      //    // Check date created if it is older than a day then update
      //   console.log(n + " this is the last updat vs " + s);
      //   if (n  < s){
      //     console.log("Updateing the history its to old");
      //     saving(cyptoCurrHist);
      //   }

      else {
        console.log("Returning from database");
        console.log(cryptocurr);
        res.json({cryptoH: cryptocurr});
      }
    }else{
      console.log("Returning from database");
      console.log(cryptocurr);
      res.json({cryptoH: cryptocurr});
    }
  // }
  }));
  // saving(cyptoCurrHist);
};
function saving(cyptoCurrHist){
  cyptoCurrHist.save(function(err) {
    if(err) {
      console.log(err);
      res.json(err);
    } else {
      console.log("Successfully stored Cyto Currencies.");
      console.log('what ')
    }
  });
}
cryptoHistoryController.update = function(req, res) {
  console.log("Updating already saved");
  cyptoCurr.collection.findByIdAndUpdate(req.params.id, { $set:
        { cryptoName: req.body.cryptoName, amount: req.body.amount,
          cryptoName2: req.body.cryptoName2, amount2: req.body.amount2,
          cryptoName3: req.body.cryptoName3, amount3: req.body.amount3,
          cryptoName4: req.body.cryptoName4, amount4: req.body.amount4}},
        { new: true }, function (err, cryptocurr) {
          if (err) {
            console.log(err);
          }else{
             res.json({crypto: req.body});
          }
  });
};
module.exports = cryptoHistoryController;
