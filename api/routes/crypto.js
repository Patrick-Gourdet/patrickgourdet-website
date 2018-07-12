var express = require('express');
var router = express.Router();
var cryptoCurr = require("../controllers/crypto.controller.js");
var cryptoCurrHist = require("../controllers/crypto.history.controller.js");
// Get lastcrypto currency
router.get('/get-curr', function(req, res) {
    cryptoCurr.list(req, res);
});

// Get single Currency by id
router.get('/show/:id', function(req, res) {
    cryptoCurr.show(req, res);
});

// Create Currency entry
router.post('/save', function(req, res) {
    cryptoCurr.create(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
    cryptoCurr.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
    cryptoCurr.delete(req, res);
});

// Create Currency History
router.post('/save-history', function(req, res) {
   console.log("IN MIDDLE");
  cryptoCurrHist.create(req, res);
});
module.exports = router;
