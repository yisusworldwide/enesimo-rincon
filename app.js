var express = require('express');
var app = express();
var path = require('path');

var fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

async function getDBConnection(){
    const db = await sqlite.open({
        filename: "database.db",
        driver: sqlite3.Database
    });
    return db;
}

app.get('/perceptions', async function(req, res){
    let db = await getDBConnection();
    let perceptions = await db.all("select id, text, created_at, updated_at from perceptions order by created_at desc");
    await db.close();
    return res.json(perceptions)
})

app.use(express.json());

app.post("/perceptions", async function(req, res) {
    let db = await getDBConnection();
    var errors=[]
    console.log(req.body)
    var data = {
        text: req.body
    }
    var sql ='INSERT or IGNORE INTO perceptions (text) VALUES (?)'
    var params =[data.text.text]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
    res.send(req.body);    // echo the result back
})


var port = 3000;
app.listen(port, function(){
    console.log('server on! http://localhost:' + port);
});
