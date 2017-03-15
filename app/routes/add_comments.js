let Ticket = require('../models/db').Ticket;
let update_db = require("../models/update_db");



function addComments(req, cb) {
    var ticket = new Ticket();
    let customer_name = req.query.customer_name;
    let comments_new = req.query.comments;


    let query = { customer_name: customer_name };
    Ticket.find(query, function(err, docs) {
        let comment = docs[0].comments;
        comment.push(comments_new);
        if (docs[0].status == "open" || docs[0].status == "new") {
            Ticket.update(query, { $set: { comments: comment } }).exec();
            Ticket.find({}, function(err, docs) {
                if (err) {
                    console.log(err);
                }
                if (docs) {
                    let data1 = JSON.stringify(docs);
                    update_db(data1);
                }
            });
            console.log("successfully added the new comment....");
            cb("successfully added the new comment....");
        } else if (docs[0].status == "closed") {
            console.log("it is in closed state..Unable to process your request");
            cb("it is in closed state..Unable to process your request");
        } else {
            console.log("your Ticket-data is not found");
            cb("your Ticket-data is not found");
        }
    });
}
module.exports = addComments;
