const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClientsSchema = new Schema({
    client: [{
        name: {
            type:String,
        },
        email: {
            type:String,
        },
        phone: {
            type:Number,
        },
        providers: [{
            pname: {
                type: Array(Object),
            }
        }],
    }],
    providers: [{
        proname: {
            type: Array(Object),
        }
    }],
});


const providersSchema = new Schema({
    providers: [{
        proname: {
            type: Array(Object),
        }
    }],

});

const Provider = mongoose.model('providers', providersSchema);
const Client = mongoose.model('clients', ClientsSchema);

module.exports = {Provider, Client};