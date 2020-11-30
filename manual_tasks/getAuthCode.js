const axios = require('axios').default;
require('dotenv').config();
const open = require('open');


console.log('a')
console.log(process.env.ZOHO_AUTH_URL)

// GET request for remote image in node.js
url = process.env.ZOHO_AUTH_URL + '&client_id=' + process.env.ZOHO_CLIENT_ID + '&scope=ZohoCreator.form.CREATE&redirect_url=http://localhost:3000/';
console.log(url);
console.log('b')

config = {

}

axios.get(
    url,
    {

    }
).then(function (response) {
    console.log(response.data);
    (async () => {
        open(response.data, { app: 'google chrome' })
    })();
}
);


