const express = require("express");
const request = require("request");
const fetch = require('node-fetch');

const app = express();

const PORT = 3010;
const TIMEOUT = 5000;

const id = Math.floor(Math.random() * 100);

app.get("/", (req, res) => {
  // TODO
  res.status(200).send("OK\n");
});

app.get("/ping", (req, res) => {
  // TODO
  res.status(200).send("ok - ping\n");
});

async function req_async(type, url) {
   var res =  request(type, url);
   return res;
}

app.get("/proxy_9090", (req, res_major) => {
  var res = proxy("9090");
  console.log("res proxy_9090: "+res);
  return res_major.status(200).send("OK proxy 9090\n");
});

async function proxy(port) {
  try {
    console.log("calling http://1c22-tp-1_bbox_1:"+port+" ...");

    const response = await fetch('http://1c22-tp-1_bbox_1:'+port)
    const statusCode = await response.statusCode;
    const msg = await response.body;


    console.log("call url:"+json.url+"\n");
    console.log("call status code: "+statusCode+"\n");
    console.log("call msg: "+msg+"\n");
  } catch (error) {
    console.log("Error response: "+error.response);
  }
};


app.get("/proxy_9091", (req, res_major) => {
  var res = proxy("9091");
  console.log("res proxy_9090: "+res);
  return res_major.status(200).send("OK proxy 9091\n");
});

/*
app.get("/proxy_9091", async (req, res_major) => {
  await new Promise( () => {
    //request("GET","http://1c22-tp-1_bbox_1:9091", { json: true }, (err, res, body) => {
      request("GET","http://google.com.ar", { json: true }, (err, res, body) => {
      if (err) {
        console.log("ERROR BBOX: " + err);
        return res_major
          .status(res ? res.statusCode : 500)
          .send("ERROR BBOX: " + err);
      }
      res_major.status(res.statusCode).send(body);
    });
  });
});
*/

/*
const timeoutObj = setTimeout(() => {
  console.log('timeout 10s');
}, 10000);
*/

app.get("/timeout", async (req, res)  => {
  await new Promise(r => setTimeout(r, 5000));
  console.log("timeout termino! ");
  res.status(200).send("timeout 5 segundos");
});

app.get("/timeout-async", async (req, res)  => {
  this.timeoutObj;
  console.log("timeout-async termino!");
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
