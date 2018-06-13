const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const express = require("express");
const app = express();
// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //to make changes to spreadsheet
const TOKEN_PATH = 'credentials.json';

app.get("/",function (request,response) {
    response.send("Hey this is Googlesheet App");
}).listen(3000);

// Load client secrets from a local file.
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
});


function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]); // get authclient 

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client); //passing auth to read,update,clear functions
  });
}

// generate credentials.json token 
function getNewToken(oAuth2Client, callback) {
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
      callback(oAuth2Client);
    });
  });
}

// add new sheet
function createNewSpreadsheet(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.create({
    auth: auth,
    resource: {
      properties: {
        title: "Accion reporting tool"
      },
      sheets: [
        {
          properties: {
            title: 'Report1'
          }
        }
      ]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("New sheet created succesfully");
    }
  });
}

// to read the data from spreadsheet 
// doing get request to GET https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}
function readData(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'Sheet1',
  }, (err, { data }) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    if (rows.length) {
      // Print columns 
      console.log("Listing of Users:");
      rows.map((row) => {
        console.log(`ID: ${row[0]},Name: ${row[1]},Age: ${row[2]}`);

      });
    } else {
      console.log('No data found.');
     // HTTP Status Code 403: The server understood the request but refuses to authorize it.

    }
  });
}

// to insert the requested data
//POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append

function insertData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'Sheet1',
    valueInputOption: "USER_ENTERED",
    resource: {
      "values": [[6, "Jayesh", 22]]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("Data added succesfully");
    }
  });
}
// to update the spreadsheet with new data PUT https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}
function updateData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'Sheet1',
    valueInputOption: "USER_ENTERED",
    resource: {
      "values": [[5, "Mit", 21],[10,"Kajal",23],[1,"Ajay",20],[2,"Bhaskar",28],[3,"karan",25],[7,"Anand",27]]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {

      console.log("Data updated succesfully");
    }
  });
}

/*
Copies a single sheet from a spreadsheet to another spreadsheet.
 Returns the properties of the newly created sheet.
*/
// to copy the data from 1 spreadsheet to other
function copySpreadsheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.sheets.copyTo({
    // The ID of the spreadsheet containing the sheet to copy.
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',  // TODO: Update placeholder value.
    // The ID of the sheet to copy.
    sheetId: 0,  // TODO: Update placeholder value.
    resource: {
      // The ID of the spreadsheet to copy the sheet to.
      destinationSpreadsheetId: '1PcsPJrAKP3hwCE0wkq_oof6Myk9dRZ96NuAGT4zZbko',  // TODO: Update placeholder value.
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("Data copied from source file to destination");
    }
  });
}


// function to clear rows and columns
function clearData(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.clear({
    // The ID of the spreadsheet containing the sheet to copy.
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'A1:C3'
    }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
      console.log("Data cleared");
    }
  });


  
}







