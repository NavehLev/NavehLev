const axios = require('axios').default;

let addNewEnterprise = (req, res, next) => {
    console.log(`req params: ${req.params}`);
    axios.post('/Enterprise', {
        name: 'test from helper server',
        company_number: '32323232323'
    })
        .then(function (response) {
            console.log(response);
            res.send(response);
            next();
        })
}

let addNewMakat = (req, res, next) => {
    console.log(`req params: ${req.params}`);
    axios.post('/Makat', {
        description_heb: 'test from helper server',
        makat: '123123123'
    })
        .then(function (response) {
            console.log(response);
            res.send(response);
            next();
        })
}

let getAuthCode = (req, res, next) => {
    url = process.env.ZOHO_AUTH_URL + '&client_id=' + process.env.ZOHO_CLIENT_ID + '&scope=ZohoCreator.form.CREATE&redirect_url=http://localhost:3000/callback';
    axios.get(
        url,
        {}
    ).then(function (response) {
        console.log(`url:${url} status: ${response.status}`);
        res.send(response.data);
        next();
    }
    );
}

let getToken = (req, res, next) => {
    authCode = req.params.get('auth_code');
    url = process.env.ZOHO_TOKEN_URL + '&client_id=' + process.env.ZOHO_CLIENT_ID + '&client_secret=' + proccess.env.ZOHO_CLIENT_SECRET + '&redirect_url=http://localhost:3000/&code=' + auth_code;
    axios.get(
        url,
        {}
    ).then(function (response) {
        console.log(`url:${url} status: ${response.status}`);
        res.send(response.data);
        next();
    }
    );
}

module.exports = {
    addNewEnterprise,
    getAuthCode,
    addNewMakat,
    getToken
}