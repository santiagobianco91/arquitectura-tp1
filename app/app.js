const express = require("express");
const request = require("request");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = express();

const PORT = 3010;
const TIMEOUT = 5000;

const id = Math.floor(Math.random() * 100);

app.get("/", (req, res) => {
  res.status(200).send("OK\n");
});

app.get("/ping", (req, res) => {
  console.log("ping OK\n");
  res.status(200).send("APP OK\n");
});

async function req_async(type, url) {
  var res = request(type, url);
  return res;
}

async function proxy(port) {
    console.log("calling http://1c22-tp-1_bbox_1:" + port + " ...");
    const response = await fetch('http://1c22-tp-1_bbox_1:'+port);
    console.log("response status code: " + response.status + "\n");
    return response;
}

app.get("/proxy_9090", async (req, res_major) => {
  try {
    console.log("comenzo 9090! ");
    var res = await proxy("9090");
    return res_major.status(res.status).send("OK proxy 9090\n");
  } catch (error) {
    console.log("Error response: " + error);
    return res_major.status(500).send("Error proxy 9090\n");
  }
});

app.get("/proxy_9091", async (req, res_major) => {
  try {
    var res = await proxy("9091");
    return res_major.status(res.status).send("OK proxy 9091\n");
  } catch (error) {
    console.log("Error response: " + error);
    return res_major.status(500).send("Error proxy 9091\n");
  }
});

app.get("/timeout", async (req, res) => {
  console.log("comenzo timeout! ");
  await new Promise((r) => setTimeout(r, 5000));
  console.log("timeout termino! ");
  res.status(200).send("timeout 5 segundos");
});

app.get("/timeout-async", async (req, res) => {
  this.timeoutObj;
  console.log("timeout-async termino!");
  res.status(200).send("timeout 5 segundos");
});

app.get("/heavy", async (req, res) => {
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
