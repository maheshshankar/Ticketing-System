const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var Schema = mongoose.Schema;



var userSchema = new Schema({
    customer_name: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    },
    created_By: {
        type: String,
        required: true
    },
    assigned_To: {
        type: String
    },
    status: {
        type: String,
        required: true
    }

});
var userSchema1 = new Schema({
    customer_name: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    }

});
var userSchema2 = new Schema({
    id: {
        type: Number,
        required: true
    },
    users: {
        type: String,
        required: true
    }

});
var Ticket = mongoose.model('Ticket', userSchema);

var Customer_Detail = mongoose.model('Customer_Detail', userSchema1);

var Users = mongoose.model('Users', userSchema2);

module.exports = { Ticket: Ticket, Customer_Detail: Customer_Detail, Users: Users };
