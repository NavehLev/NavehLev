require('dotenv').config();
const axios = require('axios').default;
let controller = require('./inbound_controller.js');

let accessToken = () => {
    let url =
        process.env.ZOHO_TOKEN_URL + '?client_id=' + process.env.ZOHO_CLIENT_ID +
        '&grant_type=authorization_code' +
        '&client_secret=' + process.env.ZOHO_CLIENT_SECRET +
        '&redirect_uri=http://localhost:3000/callback' +
        '&code=1000.e503bf7de717b03afb4d5814e6ec1bc9.25188bf155bdb273ec03496d5d6a76c6' +
        '&access_type=offline'
    axios.post(
        url,
        {}
    ).then(function (response) {
        console.log(response.data);
    })
        .catch(function (error) {
            console.log(error);
        });
}

accessToken();
//controller.newAccessToken();
