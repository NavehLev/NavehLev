require('dotenv').config();
const axios = require('axios').default;
const outboundController = require('./outbound_controller.js');

let wpHelpers = {

    parseLead: (reqData) => {
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
    parseCustomer: (reqData) => {
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
    parseOrder: (reqData) => {
        return new Promise((resolve, reject) => {
            try {
                console.log(reqData);
                data = {
                    "data":
                    {
                        "wp_id": reqData.id,
                        "customer_type":"פרטי",
                        "activity": reqData.meta_data[1].id,
                    }
                }
                resolve(data);
            } catch (err) {
                reject(err);
            }

        })
    }
}

let zcHelpers = {
    parseCustomer: (data) => {
        return new Promise((resolve, reject) => {
            try {
                res = {
                    customer: {
                        ID: data.ID
                    }
                }
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    }
}

let customer = async (req, res, next) => {
    try {
        data = await wpHelpers.parseCustomer(req.body.data);
        result = await outboundController.newCustomer(data);
        res.send("result: " + result.data.message);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

let order = async (req, res, next) => {
    try {
        //parse income order
        let data = await wpHelpers.parseOrder(req.body);
        console.log("parsed data: " + JSON.stringify(data));
        //check if customer exists
        result = await outboundController.newOrder(data);
        console.log(JSON.stringify(result));
    } catch (err) {
        console.log(err);
        res.send(err.message);
    };
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
        let data = await wpHelpers.parseLead(req.body.data);
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
    order,
    zcHelpers
}