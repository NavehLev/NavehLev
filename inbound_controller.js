require('dotenv').config();
const axios = require('axios').default;
const outboundController = require('./outbound_controller.js');

let helpers = {
    
    convertLeadData: (reqData) => {
        return new Promise((resolve, reject) => {
            data = {
                "data":{
                    title: reqData.title,
                    name: reqData.name,
                    email: reqData.email,
                    phone: reqData.phone,
                    src: "4063038000000147087",
                    type: "פרטי",
                    status:"4063038000000147111"
                }
            }
            resolve(data);
        })

    }
}

let makat = async (req, res, next) => {
    console.log(`req params: ${req.params.data}`);
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
    console.log(`req body: ${req.body.data}`);
    let data = await helpers.convertLeadData(req.body.data);
    try {
        result = await outboundController.newLead(data);
        res.send("result: " + result.data.message);
    } catch (err) {
        console.log(err);
        res.send(err.message);
    }
}


module.exports = {
    makat,
    lead
}