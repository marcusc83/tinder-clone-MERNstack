import express from "express";
import mongoose from "mongoose";
import dbCards from "./dbCards.js";
import cards from "./dbCards.js";
import Cors from "cors";


//app config
const app = express();
const port = process.env.PORT || 8001 
const connection_url = "" // enter your MongoDb connection here

//middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Marcus"));

app.post("/tinder/cards", (req, res) => {
    const dbCards = req.body;

    cards.create(dbCards, (err,data) =>{
        if(err)
        {
            res.status(500).send(err)
        }
        else 
        {
            res.status(201).send(data)
        }
    })
});

app.get("/tinder/cards", (req, res) =>{
    cards.find((err, data) => {
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.status(200).send(data)
        }
    })
});

// Listner
app.listen(port, () => console.log("listening on localhost: " + port));
