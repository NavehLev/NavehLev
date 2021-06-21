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
    },
    convertOrderData: (reqData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(reqData);
                data = {
                    id: reqData.id,
                    status: reqData.status,
                    date_created: reqData.date_created,
                    discount_total: reqData.discount_total,
                    discount_tax: reqData.discount_tax,
                    cart_tax: reqData.cart_tax,
                    total: reqData.total,
                    total_tax: reqData.total_tax,
                    order_key: reqData.order_key,
                    payment_method: reqData.payment_method,
                    payment_method_title: reqData.payment_method_title,
                    transaction_id: reqData.transaction_id,
                    customer_note: reqData.customer_note,
                    cart_hash: reqData.cart_hash,
                    number: reqData.number,
                    activity_id: reqData.meta_data[1].id,
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

let order = async (req, res, next) => {
    try {
        let data = await helpers.convertOrderData(req.body);
        console.log("parsed data: " + JSON.stringify(data));
        res.send("wp order data: " + JSON.stringify(data));
    } catch (err) {
        console.log(err);
        res.send(err.message);
    };
}


module.exports = {
    customer,
    makat,
    lead,
    order
}