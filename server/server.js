const express = require('express');
const app = express(); 

const cors = require('cors'); 

require('dotenv').config({path:"./config.env"});

const PORT = process.env.PORT || 5000; 

//use middleware

app.use(cors());
app.use(express.json());

//MongoDb connection
const conn = require("./db/connection");

//using routes
app.use(require('./routes/routes'))

conn.then(db => { 
    if(!db) return process.exit(1);

    app.listen(PORT,()=> { 
        console.log(`Server is running on Port: http://localhost:${PORT}`)
    })
    app.on('error', err => console.log(`Failed to Connect with HTTP Server: ${err}`));

}).catch(error => { 
    console.log(`Connection Failed...!${error}`);
});

