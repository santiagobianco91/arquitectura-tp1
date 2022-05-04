const express = require("express");

const app = express();

const PORT = 3010;
const TIMEOUT = 5000;

const id = Math.floor(Math.random() * 100);

app.get("/", (req, res) => {
    res.status(200).send(id + " - ping");
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