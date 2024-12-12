const express = require('express');
const Physicist = require('./js-common/physicist').Physicist;
const Db = require('./js-ss/db').Db;


const port = 3000;

const db = new Db();
// create and configure the express application
const app = express();
app.use(express.json());

// routes goes here
app.get("/home", (req, res) => res.sendFile("./html/home.html", {root: __dirname} ) );
app.get("/js-common/*", (req, res) =>{
    if(req.params[0]){
        res.sendFile(req.params[0], {root: "./js-common"});
    }else{
        res.status(400).send("Bad request");
    }
});
app.get("/js-cs/*", (req, res) =>{
    if(req.params[0]){
        res.sendFile(req.params[0], {root: "./js-cs"});
    }else{
        res.status(400).send("Bad request");
    }
});

app.get("/physicists", (req, res) => {
    try{
        res.send(db.all());
    }catch(error){
        res.status(500).send(error.message);
    }
});

app.post("/physicist/update", (req, res) =>{
    try {
        const ph = new Physicist(req.body.name, req.body.birthYear, req.body.birthPlace, req.body.comments );
        db.update(ph);
        res.status(200).send("Done");
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/physicist/delete", (req, res) => {
    try {
        const ph = new Physicist(req.body.name, req.body.birthYear, req.body.birthPlace, req.body.comments );
        db.delete(ph.name);
        res.status(200).send("Done");
    } catch (error) {
        res.status(400).send(error.message);
    }
  });

app.listen(port, () => console.log(`Server is running on port ${port}`))







console.log("hello node js")