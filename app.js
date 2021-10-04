const express = require('express');
const https = require('follow-redirects').https;
const bodyParser = require("body-parser");
const fs = require('fs');



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

})



app.post("/", function(req, res) {
  const customerEmailV = req.body.email;
  const customerPhoneV = req.body.pNumber;
  const subscriptionIdV = req.body.sID;
  const planIdV = "001";
  const returnUrlV = "https://zingyvpn.com";
  const paymentOptionV = "card";
  const cardNumberV = req.body.cNumber;
  const card_expiryMonthV = req.body.expiryM;
  const card_expiryYearV = req.body.expiryYYYY;
  const card_cvvV = req.body.cvv;
  const card_holderV = req.body.cardHolderName;

  var options = {
    'method': 'POST',
    'hostname': 'test.cashfree.com',
    'path': '/api/v2/subscriptions',
    'headers': {
      'X-Client-Id': '9353760f74de0be3bf586b67d73539',
      'X-Client-Secret': 'ee7a9d1ddbb245572990f9ba7e6de3995a0a8cfd',
      'Content-Type': 'application/json'
    },
    'maxRedirects': 20
  };

  var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "subscriptionId": subscriptionIdV,
  "planId": planIdV,
  "customerEmail": customerEmailV,
  "customerPhone": customerPhoneV,
  "expiresOn": "2022-05-30 23:59:59",
  "paymentOption": paymentOptionV,
  "card_number": cardNumberV,
  "card_expiryMonth": card_expiryMonthV,
  "card_expiryYear": card_expiryYearV,
  "card_cvv": card_cvvV,
  "card_holder": card_holderV,
  "firstChargeDate": "2021-10-06",
  "returnUrl": "https://zingyvpn.com"
});

req.write(postData);

req.end();



   console.log(customerEmailV, customerPhoneV,subscriptionIdV,planIdV,returnUrlV,paymentOptionV,cardNumberV,card_expiryMonthV);
  // console.log("we got it");
})


app.listen(3000, function() {
  console.log("The server is running at port 3000");
})
