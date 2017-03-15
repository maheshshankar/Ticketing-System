let Ticket = require('../models/db').Ticket;
let Customer_Detail = require('../models/db').Customer_Detail;
let update_db = require("../models/update_db");

function complaintDetails(req, cb) {
    console.log(req.query, 'req.query')
    Ticket.findOne({ customer_name: req.query.customer_name }, function(err, docs) {
        if (err) {
            console.log(err);
            cb(err);
        }
        if (docs == null) {
            var customer_Detail = new Customer_Detail();
            customer_Detail.customer_name = req.query.customer_name;
            customer_Detail.complaint = req.query.complaint;
            customer_Detail.save(function(err, doc) {
                if (err) return console.log(err);
            });

            var ticket = new Ticket();
            ticket.customer_name = req.query.customer_name;
            ticket.complaint = req.query.complaint;
            ticket.comments = [];
            ticket.created_By = "service_Rep1";
            ticket.assigned_To = "";
            ticket.status = "new";
            ticket.save(function(err, ticket) {
                if (err) return console.log(err);
                Ticket.find({}, function(err, docs) {
                    if (err) { console.log(err); }
                    if (docs) {
                        let data1 = JSON.stringify(docs);
                        update_db(data1);
                    }

                });
            });

            cb("successfully added the new complaint and ticket created.....");

        } else {
            console.log("Duplicates are not allowed...please select another customer name...");
            cb("Duplicates are not allowed...please select another customer name...");
        }


    });
}

module.exports = complaintDetails;
