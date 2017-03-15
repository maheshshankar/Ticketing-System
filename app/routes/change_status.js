let Ticket = require('../models/db').Ticket;
let update_db = require("../models/update_db");


function changeStatus(req, cb) {
    var ticket = new Ticket();
    let customer_name = req.query.customer_name;
    let status = "closed";

    let query = { customer_name: `${customer_name}` };
    Ticket.find(query, function(err, docs) {
        if (docs[0].status == "open" && status == "closed") {
            Ticket.update(query, { $set: { status: "closed" } }).exec();


            Ticket.find({}, function(err, docs) {
                if (err) { console.log(err); }
                if (docs) {
                    let data = JSON.stringify(docs);
                    update_db(data);
                }

            });
            console.log("successfully changed the state from open to closed");
            cb("successfully changed the state from open to closed");
        } else if (docs[0].status == "new" && status == "closed") {
            console.log("it is in new state..First assign the user...");
            cb("it is in new state..First assign the user...");
        } else if (docs[0].status == "closed") {
            console.log("it is in closed state..Unable to process your request");
            cb("it is in closed state..Unable to process your request");
        } else {
            console.log("your Ticket-data is not found");
            cb("your Ticket-data is not found");
        }
    });
}

module.exports = changeStatus;
