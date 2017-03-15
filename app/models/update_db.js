let fs = require("file-system");

function updateDb(docs) {
    fs.writeFile('/home/abilash/mypractice/poc1/public/data.txt', docs, function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log("Database Updation done........");
    });
}

module.exports = updateDb;
