let express = require("express");
let app = express();
let complaintDetails = require("./routes/add_complaint");
let changeStatus = require("./routes/change_status");
let addComments = require("./routes/add_comments");
let ticketDetails = require("./routes/tickets_details");
let assignUser = require("./routes/assign_user");



module.exports = app => {

    app.get("/ticket", (req, res) => {
        ticketDetails(req, function(docs) {
            res.send(docs);
        });
    });

    app.get("/assignuser", (req, res) => {
        assignUser(req, function(text) {
            res.send(text);

        });
    });


    app.get("/addcomplaint", (req, res) => {
        complaintDetails(req, function(text) {
            res.send(text);

        });
    });


    app.get("/changestatus", (req, resp) => {
        changeStatus(req, function(text) {
            resp.send(text);
        });
    });

    app.get("/addcomments", (req, response) => {
        addComments(req, function(text) {
            response.send(text);
        });
    });
}
