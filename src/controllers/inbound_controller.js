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
    parseCustomer: (data) => {
        return new Promise((resolve, reject) => {
            try {
                res = {
                    data:{
                        name: {
                            first_name: data.billing.first_name,
                            last_name: data.billing.last_name
                        },
                        phone: data.billing.phone,
                        email: data.billing.email
                    }
                }
                resolve(res);
            } catch (err) {
                reject(err);
            }

        })
    },
    parseOrder: (reqData) => {
        return new Promise((resolve, reject) => {
            try {
                data = {
                    data: {
                        customer_type: 'פרטי',
                        paying_customer: null,
                        activityId: reqData.meta_data[1].value,
                        order_items_subform: [
                            {
                                makat: "4087609000000339807",
                                amount: "1"
                            }
                        ]
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
                    name: {
                        first_name: data.billing.first_name,
                        last_name: data.billing.last_name
                    },
                    phone: data.billing.phone,
                    email: data.billing.email
                }
                console.log('res: ' + res)
                resolve(res);
            } catch (err) {
                console.log('error: ' + err)
                reject(err);
            }
        })
    },
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
        let customerID = '4087609000000525047';
        //parse income order to customer data
        console.log('1 - parse income order to customer');
        let customerData = await wpHelpers.parseCustomer(req.body);

        //get customer ID
        console.log('2 - get customer id');
        console.log('customer phone: ' + customerData.data.phone);
        let customer = outboundController.getCustomer(customerData.data.phone);
        console.log('customer id: ' + customerID);
        //parse income order to order data
        console.log('3 - parse order to order data');
        let orderData = await wpHelpers.parseOrder(req.body);
        //update customer id in order
        console.log('4 - update custome in order data');
        orderData.data.paying_customer = customerID;
        console.log(orderData);
        console.log('5 - create new order');
        //create new order on zoho
        result = await outboundController.newOrder(orderData);
        console.log(result.data);
        res.send(result.data);
    } catch (err) {
        console.log(err.message);
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