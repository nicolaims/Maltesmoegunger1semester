const express = require("express");
const app = express();
const port = 8080;
const { Client } = require("pg");
const cors = require("cors");
app.use(cors());

// Tillad alle klientside-anmodninger (Dette er for demonstration. Brug mere specifikke regler i produktion.)
app.use(cors());

const klient = new Client({
  user: "thsvrkvn",
  host: "ella.db.elephantsql.com",
  database: "thsvrkvn", //læg mærke til at user og database er det samme på elephant, da vi er på en shared instance
  password: "48EwLxMNlE3EY4oEKwOOk5Zx-EBMXvC3",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

klient.connect();
app.get("/changes", async (req, res) => {
  try {
    let queryData = await klient.query("SELECT * from changes");
    res.json({
      ok: true,
      skovData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});
app.get("/brazil", async (req, res) => {
  try {
    let queryData = await klient.query("SELECT * from brazil");
    res.json({
      ok: true,
      skovData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});
app.get("/brazilfires", async (req, res) => {
  try {
    let queryData = await klient.query("SELECT * FROM brazilfires");
    res.json({
      ok: true,
      skovData: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});
app.listen(port, () => {
  app.get("/bubbleforest", async (req, res) => {
    try {
      let queryData = await klient.query("SELECT * FROM bubbleforest");
      res.json({
        ok: true,
        skovData: queryData.rows,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
      });
    }
  });
  app.get("/smallchanges", async (req, res) => {
    try {
      let queryData = await klient.query("SELECT * FROM smallchanges");
      res.json({
        ok: true,
        skovData: queryData.rows,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
      });
    }
  });
  app.get("/growingamazon", async (req, res) => {
    try {
      let queryData = await klient.query("SELECT * FROM growingamazon");
      res.json({
        ok: true,
        skovData: queryData.rows,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
      });
    }
  });
  app.get("/growingyearamazon", async (req, res) => {
    try {
      let queryData = await klient.query("SELECT * FROM growingyearamazon");
      res.json({
        ok: true,
        skovData: queryData.rows,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
      });
    }
  });
  app.get("/totalannual", async (req, res) => {
    try {
      let queryData = await klient.query("SELECT * FROM totalannual");
      res.json({
        ok: true,
        skovData: queryData.rows,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
      });
    }
  });
});
