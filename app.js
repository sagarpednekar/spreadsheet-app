const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const express = require("express");
const app = express();
const spreadsheetRoutes = require('./routes/spreadsheetRoutes');
// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //to make changes to spreadsheet
const TOKEN_PATH = 'credentials.json';
const PORT = 4000;


// listen to port
app.use('',spreadsheetRoutes);

var server = app.listen(PORT, function() {
  console.log(`AgileGantt is listening to  ${PORT}`);
});
/* // Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  // uncomment this to insert data
  //authorize(JSON.parse(content), insertData);
  // uncomment this to create spreadsheet
  //authorize(JSON.parse(content), createNewSpreadsheet);
  // uncomment this to update spreadsheet
  //authorize(JSON.parse(content), updateData);
  // uncomment this to copy spreadsheet
  //authorize(JSON.parse(content),copySpreadsheet);
  //authorize(JSON.parse(content),ssclearData);
  authorize(JSON.parse(content), readData);
}); */

