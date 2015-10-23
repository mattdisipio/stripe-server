var express = require('express');
var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_test_kNwGJYtiess4vN2wHkkAj1Jb');

var app = express();
app.use(bodyParser());

app.post('/charge', function(req, res) {
    var stripeToken = req.body.stripeToken;
    var amount = 1000;

    stripe.charges.create({
        card: stripeToken,
        currency: 'usd',
        amount: req.body.amount,
        description : req.body.description
    },
    function(err, charge) {
        if (err) {
            res.send(500, err);
        } else {
            console.log('Thanks for your payment!')
            res.send(204);
        }
    });
});

app.use(express.static(__dirname));
app.listen(process.env.PORT || 3000);