require('dotenv').config();
const axios = require('axios').default;

//get access token using refresh token
let getAccessToken = () => {
    return new Promise((resolve, reject) => {
        let url =
        "https://accounts.zoho.com/oauth/v2/token" +
        '?refresh_token=' + process.env.ZOHO_REFRESH_TOKEN +
        '&client_id=' + process.env.ZOHO_CLIENT_ID +
        '&client_secret=' + process.env.ZOHO_CLIENT_SECRET +
        '&grant_type=refresh_token'
        axios.post(
            url,
            {}
        ).then(function (response) {
            let token = response.data.access_token;
            resolve(token);
        })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });

    })

}




module.exports = {
    getAccessToken
}