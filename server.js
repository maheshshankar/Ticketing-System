let express = require("express");
let app = express();

app.use(express.static(__dirname + "/public"))
require("./app/routes")(app);


app.listen(3000, () => { console.log("connected to port 3000"); });
