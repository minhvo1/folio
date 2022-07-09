require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const PORT = process.env.PORT || 3001;


const app = express();

// PG database client/connection setup
/* const csv = require('csv-parser')
const fs = require('fs') */

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { json } = require("express");
const db = new Pool(dbParams);
//db.connect();

//console.log(db);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
  db.query(`SELECT * FROM tickers`)
    .then(data => {
      console.log(data);
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/competitions", (req, res) => {
  db.query(`SELECT * FROM competitions`)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/competitions/user/:id", (req, res) => {
  db.query(`SELECT * FROM competition_users WHERE user_id = $1`,[req.params["id"]])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/users", (req, res) => {
  db.query(`SELECT * FROM users`)
    .then(data => {
      console.log(data);
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});

app.get("/portfolios/:id", (req, res) => {
  db.query(`SELECT * FROM portfolios WHERE user_id = $1`,[req.params["id"]])
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => res.json({ message: err }));
});




/* app.get("/get_tickers", (req, res) => {
  const results = [];

  fs.createReadStream('./datas/listing_status.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      //console.log(results);
      let string = "";
      for (const row of results) {
        string += `INSERT INTO tickers (portfolio_id, ticker, company_name) VALUES (1, '${row['symbol']}', '${row['name']}');`
        string += "<br />";
    
      }
      console.log(string);
      return res.send(string);
    });
}); */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});