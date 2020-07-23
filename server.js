const express = require("express");

let app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`<form action="/answer" method="POST">
    <h3>What is the color of a sky?</h3>
    <input name="color" type="text">
    <button>Submit</button>
    </form>`);
});

app.post("/answer", (req, res) => {
  if (req.body.color.toUpperCase() === "BLUE") {
    res.send(`<h1>Hii you submitted the form,  and you are right</h1>`);
  } else {
    res.send(`<h1>Know more</h1>
      <a href="/">Homepage</a>
      `);
  }
});

app.listen(5000);
