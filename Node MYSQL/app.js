const express= require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql')


const app= express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '127.0.0.1',
    user            : 'root',
    password        : '',
    database        : 'Sample'
});
// Add record
app.get("/add",(req,res)=>{
res.sendFile(__dirname+"/add.html");
});

app.post('/add', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body;
        connection.query('INSERT INTO test SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        if (!err) {
            res.send(`User with the record ID  has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from beer table are:11 \n', rows)

        })
    })
});

// Get all records
app.get('/read', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from test', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from beer table are: \n', rows)
        })
    })
});

app.listen(3000,()=>{
console.log("Server Started");
});