var express = require('express')
var bodyParser = require('body-parser');
var app = express();
let port = 3001;
if (process.env.NODE_ENV === 'prod') {
    port = process.env.port || process.env.PORT || 1337;
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
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
    let cursor = collection.find({});
    cursor.toArray().then(content => {
        res.send(content);
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

app.get("/butik", function(req, res){
    const collection = db.collection("Butik");
    let cursor = collection.find({});
    cursor.toArray().then(content => {
        res.send(content);
    });
});

app.get("/butik/:id", function(req, res){
    const collection = db.collection("Butik");
    let cursor = collection.find({_id: new mongodb.ObjectID(req.params.id)});
    cursor.toArray().then(content => {
        res.send(content);
    });
});

app.post("/butik/opret", function(req, res){
    const collection = db.collection("Butik");
    collection.insertOne({
        Logo: req.body.Logo,
        Navn: req.body.Navn,
        Adresse: req.body.Adresse,
        Telefon: req.body.Telefon,
        Kodeord: req.body.Kodeord,
        Details: req.body.Details,
        KontaktOplysninger: req.body.KontaktOplysninger
    }, function(){
        res.send();
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))