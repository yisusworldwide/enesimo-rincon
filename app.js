//THIS IS THE SERVER SIDE

const express = require('express');
const app = express();
var path = require('path');

const fs = require('fs');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const open = require('open');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function getDBConnection(){
    const db = await sqlite.open({
        filename: "database.db",
        driver: sqlite3.Database
    });
    return db;
}

//GET API
app.get('/perceptions', async function(req, res){
    let db = await getDBConnection();
    let perceptions = await db.all("select id, text, created_at, updated_at from perceptions order by created_at desc");
    await db.close();
    res.json(perceptions);
})

//POST API
app.post("/perceptions", async function(req, res) {
    let db = await getDBConnection();
    var errors=[]
    console.log(req.body)
    var data = {
        text: req.body
    }
    var sql ='INSERT or IGNORE INTO perceptions (text) VALUES (?)'
    var params =[data.text.text]
    db.run(sql, params, function (err, results) {
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

//PUT API
//For our API, we're going to configure PUT to be able to handle single-user editing, 
//so we're going to use the :id route parameter this time.

app.put("/perceptions/:id", async function(req, res) {
    let db = await getDBConnection();
    var errors=[]
    console.log(req.body);
    var data = {
        text: req.body
    }
    var sql ='UPDATE perceptions SET text = ? WHERE id = ?'
    var params =[req.params.id]
    db.run(sql, params, function (err, results) {
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

//DELETE API
app.delete("/perceptions/:id", async function(req, res) {
    let db = await getDBConnection();
    var errors=[]
    console.log(req.body)
    var data = {
        text: req.body
    }
    var sql ='DELETE FROM perceptions WHERE id = ?'
    var params =[req.params.id]
    db.run(sql, params, function (err, results) {
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
app.listen(port, () => {
    console.log('server on! http://localhost:' + port);
    open('http://localhost:' + port);
});