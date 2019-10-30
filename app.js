var express = require('express');
var cors = require("cors");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var app = express();
let port = 3001;
if (process.env.NODE_ENV === 'prod') {
    port = process.env.port || process.env.PORT || 1337;
}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
const uri = "mongodb+srv://Oliver:RME4gUT1U8xaOpMH@cluster0-juyfc.azure.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {dbName: "WorldCruise"});

app.get('/', (req, res) => res.send('Hello World!'));

//Bruger Start

let BrugerSchema = new Schema({
    Navn: String,
    Adresse: String,
    Email: String,
    Kodeord: String,
    Nationalitet: String,
    Penge: String,
    Aktiv: Boolean,
    Kode: String
});
let BrugerModel = mongoose.model("Bruger", BrugerSchema, "Bruger");

app.get("/bruger", function(req, res){    
    BrugerModel.find({}, function(err, bruger){
        res.send(bruger);
    });
});

app.post("/bruger/opret", function(req, res){
    BrugerModel.create(req.body, function(){
        res.send();
    })
});

app.post("/bruger/slet/:id", function(req, res){
    BrugerModel.deleteOne({_id: req.params.id}, function(err){
        res.send();
    });
});

app.get("/bruger/hent/:id", function(req, res){
    BrugerModel.find({_id: req.params.id}, function(err, bruger){
        res.send(bruger);
    });
});

app.post("/bruger/edit/:id", function(req, res){
    BrugerModel.findOneAndUpdate({_id: req.params.id}, req.body, function(err, bruger){
        res.send();
    });
});

app.post("/bruger/login", function(req, res){
    BrugerModel.findOne({Email: req.body.Email}, function(err, bruger){
        if(bruger.Kodeord == req.body.Kodeord){
            res.send(bruger.id);
        } else {            
            res.status(400).send("Wrong email or password!");
        }
    });
});


//Bruger End

//Administrator Start
let AdminSchema = new Schema({
    Navn: String,
    Kodeord: String
});
let AdminModel = mongoose.model("Administrator", AdminSchema, "Administrator");

app.get("/administrator", function(req, res){
    AdminModel.find({}, function(err, admin){
        res.send(admin);
    });
});

app.post("/administrator/opret", function(req, res) {
    AdminModel.create(req.body, function(){
        res.send();
    });
});

app.post("/administrator/login", function(req, res){
    AdminModel.findOne({Navn: req.body.Navn}, function(err, admin){
        if(admin.Kodeord == req.body.Kodeord){
            res.send(admin.id);
        } else {            
            res.status(400).send("Wrong email or password!");
        }
    });
});

//Administrator End

//Butik Start

let ButikSchema = new Schema({
    Logo: String,
    Navn: String,
    Adresse: String,
    Telefon: String,
    Kodeord: String,
    Details: String,
    KontaktOplysninger: String,
    Aktiv: Boolean,
    Kode: String,
    Email: String,
    belob: String
});
let ButikModel = mongoose.model("Butik", ButikSchema, "Butik");


app.get("/butik", function(req, res){
    ButikModel.find({}, function(err, butik){
        res.send(butik);
    });
});

app.get("/butik/:id", function(req, res){
    ButikModel.findById(req.params.id, function(err, butik){
        res.send(butik);
    });
});


//does delete, but does not redirect back
app.post("/butik/slet/:id", function(req, res){
    ButikModel.deleteOne({_id: req.params.id}, function(err){
        res.send(); //Ok
    });
});

app.post("/butik/opret", function(req, res){
    ButikModel.create(req.body,function(){
        res.send();
    });
});

app.post("/butik/edit/:id", function(req, res){
    ButikModel.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {}, function(err, doc){
        res.send(); //Ok
    });
});

app.post("/butik/login", function(req, res){
    AdminModel.findOne({Navn: req.body.Navn}, function(err, admin){
        if(admin.Kodeord == req.body.Kodeord){
            res.send(admin.id);
        } else {            
            res.status(400).send("Wrong email or password!");
        }
    });
});

//Butik End

app.listen(port, () => console.log(`Example app listening on port ${port}!`))