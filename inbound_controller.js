require('dotenv').config();
const axios = require('axios').default;
const outboundController = require('./outbound_controller.js');

let helpers = {

    convertLeadData: (reqData) => {
        return new Promise((resolve, reject) => {
            try {
                data = {
                    "data": {
                        title: reqData.title,
                        name: reqData.name,
                        email: reqData.email,
                        phone: reqData.phone,
                        src: "4063038000000147087",
                        type: "פרטי",
                        status: "4063038000000147111"
                    }
                }
                resolve(data);
            } catch (err) {
                reject(err);
            }

        })

    },
    convertCustomerData: (reqData) => {
        return new Promise((resolve, reject) => {
            try {
                data = {
                    "data": {
                        name: reqData.CUSTDES,
                        email: reqData.EMAIL,
                        phone: reqData.PHONE,
                        priority_serial: "",
                        address: {
                            district_city: reqData.STATE
                        },
                        payment_terms: ""
                    }
                }
                resolve(data);
            } catch (err) {
                reject(err);
            }

        })
    }
}
let customer = async (req, res, next) => {
    try {
        data = await helpers.convertCustomerData(req.body.data);
        result = await outboundController.newCustomer(data);
        res.send("result: " + result.data.message);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}

let makat = async (req, res, next) => {
    console.log(`req params: ${req.body.data}`);
    data = {}
    try {
        result = await outboundController.newMakat(req.data);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}

let lead = async (req, res, next) => {
    try {
        let data = await helpers.convertLeadData(req.body.data);
        result = await outboundController.newLead(data);
        res.send("result: " + result.data.message);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}


module.exports = {
    customer,
    makat,
    lead,
}