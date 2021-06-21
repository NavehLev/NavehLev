require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DB_URL_DEV,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
)

const User = mongoose.model('User', {
    name:
    {
        type: String
    },
    age:
    {
        type: Number

    }
})

const me = new User({
    name: "Naveh Lev",
    age: 32
})

me.save().then(() =>{
    console.log(me);
}).catch((err) =>{
    console.log('error', err)
})

