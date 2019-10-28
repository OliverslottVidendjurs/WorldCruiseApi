var express = require('express')
var bodyParser = require('body-parser');
var app = express();
const port = 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Oliver:RME4gUT1U8xaOpMH@cluster0-juyfc.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(err => {
    if(err) console.error(err);
    db = client.db("WorldCruise");
});

app.get('/', (req, res) => res.send('Hello World!'))

app.get("/bruger", function(req, res){    
    const collection = db.collection("Bruger");
    collection.findOne({}, function(err, doc){
        if(err){

        } else {
            res.send(doc);
        }
    });
});

app.post("/bruger/opret", function(req, res){
    const collection = db.collection("Bruger");
    collection.insertOne({
        Navn: req.body.Navn,
        Adresse: req.body.Adresse,
        Email: req.body.Email,
        Kodeord: req.body.Kodeord,
        Nationalitet: req.body.Nationalitet,
        Penge: 0,
        Aktiv: true
    }, function(){
        res.send(); //200 ok?
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))