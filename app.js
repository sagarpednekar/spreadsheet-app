const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const spreadsheetRoutes = require('./routes/spreadsheetRoutes');

const PORT = 4000;


// listen to port
app.use('',spreadsheetRoutes);

var server = app.listen(PORT, function() {
  console.log(`AgileGantt is listening to  ${PORT}`);
});