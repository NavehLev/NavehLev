require('dotenv').config();
let controller = require('./controller');
const axios = require('axios').default;

const express = require('express');
const app = express();
const port = process.env.DEV_HOST;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//axios setting
axios.defaults.baseURL = process.env.ZOHO_CRM_BASE_URL;
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


app.get('/', (req, res) => {
    console.log(req.method);
    res.send('Hello World!');
})

//get authentication code
app.get('/auth', controller.getAuthCode);

//get from Priority server and post to Zoho app
app.get('/customers', (req,res) => {
    res.send('customers');
});
app.get('/makats', (req,res) => {
    res.send('makats');
});

//post to Zoho app
app.post('/customer',controller.addNewEnterprise);
app.post('/makat', controller.addNewMakat);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})