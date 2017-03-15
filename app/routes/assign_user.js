let Ticket = require('../models/db').Ticket;
let Customer_Detail = require('../models/db').Customer_Detail;
let User = require('../models/db').Users;
let update_db = require("../models/update_db");


function assignUser(req, cb) {


    let query = { customer_name: req.query.customer_name };
    let user_assigned = req.query.user;
    let customer = req.query.customer_name;


    Ticket.find(query, function(err, docs) {
        if (docs[0].status == "new") {
            Ticket.update(query, { $set: { assigned_To: user_assigned, status: "open" } }).exec();
            Ticket.find({}, function(err, docs) {
                if (err) {
                    console.log(err);
                }
                if (docs) {
                    let data1 = JSON.stringify(docs);
                    update_db(data1);
                }
            });
            console.log("successfully assigned the user to " + customer);
            cb("successfully assigned the user");
        } else if (docs[0].status == "open") {
            console.log("user is already assigned.....");
            cb("user is already assigned.....");

        } else if (docs[0].status == "closed") {
            console.log("it is in closed state..unable to access....");
            cb("it is in closed state..unable to access....");

        } else {
            console.log("sorry..your data is not found...");
            cb("sorry..your data is not found...");
        }
    });
}
module.exports = assignUser;
