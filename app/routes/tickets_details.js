 let Ticket = require('../models/db').Ticket;
 let Customer_Detail = require('../models/db').Customer_Detail;

 function ticketDetails(req, cb) {
     let customer_name = req.query.customer_name;
     let query = { customer_name: customer_name };
     Ticket.find(query, function(err, docs) {
         cb(docs);
     });
 }
 module.exports = ticketDetails;
