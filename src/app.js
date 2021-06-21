require('dotenv').config();
let inboundController = require('./controllers/inbound_controller');
const axios = require('axios').default;

const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//axios setting
axios.defaults.baseURL = process.env.ZOHO_CRM_BASE_URL;

/*
inbound API
*/
//Customer
app.post('/customer', inboundController.customer);

//Makat
app.post('/makat', inboundController.makat);

//Lead
app.post('/lead', inboundController.lead);

//Order
app.post('/order', inboundController.order);

/*
outbound API
*/

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})