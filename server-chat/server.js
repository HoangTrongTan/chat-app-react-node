const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

//database
const db = require("./config/db.config");
db.connect();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//use EJS as the view engine
app.set('view engine' , 'ejs');

router(app);

const PORT = 6868;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});