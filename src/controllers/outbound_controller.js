require('dotenv').config();
const axios = require('axios').default;
const auth = require('./auth.js');

//add new user
let newCustomer = async (data) => {
    console.log("post data:" + data);

    let token = null;
    try {
        token = await auth.getAccessToken();
    } catch (err) {
        console.log(err.response);
    }
    return new Promise((resolve, reject) => {
        if (token == null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/form/Customer';
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        response = axios.post(
            url,
            data,
            config
        ).then((response) => {
            resolve(response);
        })
            .catch((error) => {
                reject(error);
            });
    })
}
//get customer by identity_number
let getCustomer = async (phone) => {
    console.log('get customer');
    let token = null;
    try {
        token = await auth.getAccessToken();
    } catch (err) {
        console.log(err.response);
    }
    return new Promise((resolve, reject) => {
        if (token == null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/report/customers?phone=' + phone;
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        response = axios.get(
            url,
            config
        ).then((response) => {
            resolve(response);
        })
            .catch((error) => {
                reject(error);
            });
    })
}

//add new order
let newOrder = async (data) => {
    let token = null;
    try {
        token = await auth.getAccessToken();
    } catch (err) {
        console.log(err.response);
    }
    return new Promise((resolve, reject) => {
        if (token == null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/form/Order';
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        axios.post(
            url,
            data,
            config
        ).then(function (response) {
            resolve(response);
        })
            .catch((error) => {
                reject(error);
            });
    })
}

//add new lead
let newLead = async (data) => {
    let token = null;
    try {
        token = await newAccessToken();
    } catch (err) {
        console.log(err);
    }
    return new Promise((resolve, reject) => {
        if (token == null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/form/Lead';
        let config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        response = axios.post(
            url,
            data,
            config
        ).then((response) => {
            resolve(response);
        })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

//Authentication API
let newAccessToken = () => {
    return new Promise((resolve, reject) => {

        let url =
            process.env.ZOHO_TOKEN_URL +
            '?client_id=' + process.env.ZOHO_CLIENT_ID +
            '&grant_type=refresh_token' +
            '&client_secret=' + process.env.ZOHO_CLIENT_SECRET +
            '&refresh_token=' + process.env.ZOHO_REFRESH_TOKEN;
        axios.post(
            url,
            {}
        ).then(function (response) {
            console.log('newAccessToken: ' + response.data.access_token);
            resolve(response.data.access_token);
        })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })

}

//get customer id from zoho by phone or add new customer. data = parsed data from WP
let getCustomerId = async (data) => {
   
}

module.exports = {
    newCustomer,
    getCustomer,
    getCustomerId,
    newOrder,
    newLead
}