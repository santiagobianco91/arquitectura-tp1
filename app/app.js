const express = require("express");
const request = require('request');

const app = express();

const PORT = 3010;
const TIMEOUT = 5000;

const id = Math.floor(Math.random() * 100);

app.get("/", (req, res) => { // TODO
    res.status(200).send("OK");
});

app.get("/ping", (req, res) => { // TODO
    res.status(200).send("ok - ping");
});

app.get("/proxy_9090", (req, res_major) => {
    request('http://1c22-tp-1_bbox_1:9090', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log(body.url);
        //console.log(body.explanation);
        res_major.status(200).send(body);
    });
});

app.get("/proxy_9091", (req, res_major) => {
    request('http://1c22-tp-1_bbox_1:9091', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        //console.log(body.url);
        //console.log(body.explanation);
        res_major.status(200).send(body);
    });
});


app.get("/timeout", (req, res) => {
    setTimeout(() => {
        res.status(200).send(id + " - timeout");
    }, TIMEOUT);
});

app.get("/heavy", (req, res) => {
    let start = new Date();

    while (new Date() - start < TIMEOUT);

    res.status(200).send(id + " - heavy");
});

app.listen(PORT, () => {
    console.log("Escuchando en puerto", PORT);
});