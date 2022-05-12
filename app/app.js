const express = require("express");
const request = require("request");
var request1 = require('sync-request');

const app = express();

const PORT = 3010;
const TIMEOUT = 5000;

const id = Math.floor(Math.random() * 100);

app.get("/", (req, res) => {
  // TODO
  res.status(200).send("OK");
});

app.get("/ping", (req, res) => {
  // TODO
  res.status(200).send("ok - ping");
});

app.get("/proxy_9090", (req, res_major) => {
  //var res = request1('GET', 'http://1c22-tp-1_bbox_1:9090');
  var res = request1('GET', 'http://localhost:3010/timeout');
  console.log(res.statusCode);
  return res_major.status(res.statusCode).send(res.body);
  // request("http://1c22-tp-1_bbox_1:9090", { json: true }, (err, res, body) => {
  //   if (err) {
  //     console.log("ERROR BBOX: " + err);
  //     return res_major
  //       .status(res ? res.statusCode : 500)
  //       .send("ERROR BBOX: " + err);
  //   }
  //   res_major.status(res.statusCode).send(body);
  // });
});

app.get("/proxy_9091", (req, res_major) => {
  request("http://1c22-tp-1_bbox_1:9091", { json: true }, (err, res, body) => {
    if (err) {
      console.log("ERROR BBOX: " + err);
      return res_major
        .status(res ? res.statusCode : 500)
        .send("ERROR BBOX: " + err);
    }
    res_major.status(res.statusCode).send(body);
  });
});

app.get("/timeout", async (req, res)  => {
  await new Promise(r => setTimeout(r, 5000));
  res.status(200).send("timeout 5 segundos");
});

app.get("/heavy", (req, res) => {
  var limit = 10000000000;
  var sum = 0;
  var pi = 0;

  let start_time = new Date();
  console.log("Init time: " + start_time);

  for (var i = 1; i <= limit; i++) sum += 1 / i ** 2;

  pi = Math.sqrt(sum * 6);

  let end_time = new Date();
  console.log("End time: " + end_time);
  console.log("Diff time: " + Math.abs(start_time - end_time) / 1000 + "s");

  res.status(200).send(id + " - PI: " + pi + "\n");
});

app.listen(PORT, () => {
  console.log("Escuchando en puerto", PORT);
});
