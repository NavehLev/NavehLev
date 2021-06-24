require('dotenv').config();
const axios = require('axios').default;
authController = require('./src/controllers/auth.js');
outboundController = require('./src/controllers/outbound_controller.js');


authController.getAccessToken().then(function (accessToken) {
    console.log('token: ' + accessToken); 
});

outboundController.newOrder();

