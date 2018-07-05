const express = require("express");
var router = express.Router();
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const app = express();
const {readData,insertData, createNewSpreadsheet , clearData ,updateData,copySpreadsheet} = require('../controller/sheets');
// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //to make changes to spreadsheet
const TOKEN_PATH = './credentials.json';
const PORT = 4000;

router.route('/getData').get((req, res) => {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            readData(oAuth2Client);
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        readData(oAuth2Client, (err, result) => {
          res.send(result)
        })
      }
    })
    // code to generate new token ends here  
  })
})

// routes for create spreadsheet
router.route('/new/spreadsheet').get((req, res) => {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            createNewSpreadsheet(oAuth2Client,(err,result)=>{
                res.send(result);
            });
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        createNewSpreadsheet(oAuth2Client,(err,result)=>{
          res.send(result);
      });
      }
    })
    // code to generate new token ends here  
  })
})



// routes for posting new data spreadsheet
router.route('/add-data/spreadsheet').post((postmanReq, res) => {
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            insertData(oAuth2Client,postmanReq.body , (error, result)=>{
              res.send(result.updates);
            });
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        insertData(oAuth2Client, postmanReq.body , (error, result)=>{
          res.send(result.updates);
        });
      }
    })
    // code to generate new token ends here  
  })
})

// routes for posting new data spreadsheet
router.route('/update/spreadsheet').put((req, res) => {
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            updateData(oAuth2Client,(err,result)=>{
              res.send(result);
            });
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        updateData(oAuth2Client,(err,result)=>{
          res.send(result);
        });
      }
    })
    // code to generate new token ends here  
  })

})

router.route('/copy/spreadsheet').post((req, res) => {
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            copySpreadsheet(oAuth2Client,(err,result)=>{
              res.send(result);
            });
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        copySpreadsheet(oAuth2Client,(err,result)=>{
          res.send(result);
        });
      }
    })
    // code to generate new token ends here  
  })

})

router.route('/clear/spreadsheet').get((req, res) => {
  fs.readFile('client_secret.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    //authorize(JSON.parse(content),readData);
    // manupulate authorise function
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // code to generate new token 
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return callback(err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            clearData(oAuth2Client,(err,result)=>{
              res.send(result);
            });
          });
        });
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        clearData(oAuth2Client,(err,result)=>{
          res.send(result);
        });
  }
    })
    // code to generate new token ends here  
  })

})





module.exports = router;