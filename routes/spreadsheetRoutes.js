const express = require("express");
const cookieparser = require("cookie-parser")
var router = express.Router();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const app = express();
const request = require("request");
app.use(cookieparser())
const { readData, insertData, createNewSpreadsheet, clearData, updateSheetName, copySpreadsheet } = require('../controller/sheets');
// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //to make changes to spreadsheet
const TOKEN_PATH = './credentials.json';
const PORT = 4000;


router.route('/').get((req, res) => {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    //const token = { "Bearer": req.cookies.access_token, "expiresAt": req.cookies.expires_At }
    // oAuth2Client.setCredentials(JSON.parse(token));
    // readData(oAuth2Client, (err, result) => {
    //   res.send(result)
    // })
    res.send('Hit / route')
  })
})





module.exports = router;