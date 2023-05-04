const express = require('express');
require('dotenv').config()

const port = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



const DocRoute = require('./routes/Doctor.Route')
app.use('/', DocRoute)

const AssistRoute = require('./routes/Assistant.Route')
app.use('/', AssistRoute)

const AuthRoute = require('./routes/Auth.Route')
app.use('/', AuthRoute)




app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

