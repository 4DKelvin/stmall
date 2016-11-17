var express = require("express"),
    app = express();
app.use(express.static('./serve'));
app.listen(4000);