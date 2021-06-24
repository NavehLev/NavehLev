require('dotenv').config();
const axios = require('axios').default;
const auth = require('./auth.js');

//add new user
let newCustomer = async (data) => {
    let token = null;
    try {
        token = await auth.getAccessToken();
    } catch (err) {
        console.log(err);
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
                console.log(error);
                reject(error);
            });
    })
}
//get customer by identity_number
let getCustomer = async(id) =>{
    let token = null;
    try {
        token = await auth.getAccessToken();
    } catch (err) {
        console.log(err);
    }
    return new Promise((resolve, reject) => {
        if (token == null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/report/customers?identity_number=' + id;
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
        console.log('new order token: ' + token);
    } catch (err) {
        console.log(err);
    }
    return new Promise((resolve, reject) => {
        if (token != null) { reject('no token') }
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
            console.log('data: ' + JSON.stringify(response.data));
            resolve(response.data);
        })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    })
}

//add new makat
let newMakat = async (data) => {
    let token = null;
    try {
        token = await newAccessToken();
    } catch (err) {
        console.log(err);
    }
    return new Promise((resolve, reject) => {
        if (token != null) { reject('no token') }
        let url = process.env.ZOHO_CRM_BASE_URL + '/form/Makat';
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
            console.log('data: ' + response.data);
            resolve(response.data);
        })
            .catch((error) => {
                console.log(error);
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

module.exports = {
    newCustomer,
    getCustomer,
    newMakat,
    newOrder,
    newLead
}