require('dotenv').config();
const axios = require('axios').default;
authController = require('./src/controllers/auth.js');
outboundController = require('./src/controllers/outbound_controller.js');


// authController.getAccessToken().then(function (accessToken) {
//     console.log('token: ' + accessToken);
// });

orderData = {
    "data": {
        "paying_customer": "4087609000000525047",
        "order_items_subform": [
            {
                "makat": "4087609000000339807",
                "amount": "1"
            }
        ],
        "customer_type":"פרטי",
        "activity":"4087609000000703036"
    }
}


customerData = {
    "data": {
        "name_heb":{
            "first_name":"נווה",
            "last_name":"בדיקה"
        }
    }
}
let testCustomer = async () => { 
    let customerID;
    try{
        //check if customer exists on zoho
        let customer = await outboundController.getCustomer('301284188');
        if(customer.data.data[0].ID != null){
            customerID = customer.data.data[0].ID
            console.log('Customer exists in zoho: ' + customerID);
        }
    }catch(err){
        //if customer doesn't exists on zoho -> return error 3100
        console.log("No customer found: " + err.response.data);
        try{
            //add new customer to zoho
            let result =  await outboundController.newCustomer(customerData);
            customerID = result.data.data.ID;
            console.log("New customer added to zoho: " + customerID);
        }catch(err){
            console.log("Error on adding new customer: " + err.response.data);
        }
    }
}

let testOrder = async() => {
    try {
        let newOrder = await outboundController.newOrder(orderData);
        console.log('New order added: ' + newOrder.data.data);
    } catch (error) {
        console.log(error);
    }
}

let getCustomer = async() => {
    try {
        let customer = await outboundController.getCustomer('+972533376766');
        console.log(customer);
    } catch (error) {
        console.log("error: " + error);
    }
}
//testCustomer();
//testOrder();
//getCustomer();
