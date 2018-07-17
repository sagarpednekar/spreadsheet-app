const { google } = require('googleapis');

// methods for routes

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
function updateSheetName(auth,done){
  const sheets = google.sheets({ version: 'v4', auth });
  sheetid="1294138922"
  sheets.spreadsheets.batchUpdate({
    spreadsheetId: '1d6lCfRqU5A9Z0Gj0hWiTu7h-qYApnK6s1Qd7PkAq5q8',
    resource:{
      requests:[{
        "updateSheetProperties":{
            "properties":{
              "sheetId":sheetid,
              "title":"task1"
              
            },
            "fields":"title"
        }
      }]
    }
  }), (err, res) => {
  return done(res); 
  }
}
function readData(auth, done) { //done -> callback
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1d6lCfRqU5A9Z0Gj0hWiTu7h-qYApnK6s1Qd7PkAq5q8',
    majorDimension: 'ROWS',
    range: 'task1',
  }, (err, { data }) => {
    if (err) return done(err, null)
    const rows = data.values;
    const totalRows = data.values.length;
    const firstCol = data.values[0];

    console.log(totalRows);

    var modified = [];
    for (let i = 0; i < totalRows - 1; i++) {
      let result = {};
      for (let j = 0; j < firstCol.length; j++) {
        if (!rows[i + 1][j]) {
          result[firstCol[j]] = "";
        }
        else {
          result[firstCol[j]] = rows[i + 1][j];
        }

      }
      modified.push(result);
    }
    //console.log(result);
    console.log(modified);

    return done(null, modified);
  });
}

// to insert the requested data
//POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append

function insertData(auth, data, done) {
  console.log(data);
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'Sheet1',
    valueInputOption: "USER_ENTERED",
    resource: data
  }, (err, { data }) => {
    if (err) {
      console.log(done(err, null));
      return;
    } else {
      console.log("Data added succesfully");
      console.log(data);
      return done(null, data);
    }
  });
}
// to update the spreadsheet with new data PUT https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}
function updateData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.update({
    auth: auth,
    spreadsheetId: '1d6lCfRqU5A9Z0Gj0hWiTu7h-qYApnK6s1Qd7PkAq5q8',
    range: 'Sheet1',
    valueInputOption: "USER_ENTERED",
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
/*
POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo

*/
function copySpreadsheet(auth, source, destination, done) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.sheets.copyTo({
    // The ID of the spreadsheet containing the sheet to copy.
    auth: auth,
    spreadsheetId: source,  // TODO: Update placeholder value.
    // The ID of the sheet to copy.
    sheetId: 0,  // TODO: Update placeholder value.
    resource: {
      // The ID of the spreadsheet to copy the sheet to.
      destinationSpreadsheetId: destination,  // TODO: Update placeholder value.
    }
  }, (err, response) => {
    if (err) console.log(done(err, null));
    return done(null, response)
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
module.exports.readData = readData;
module.exports.updateSheetName = updateSheetName;
module.exports.insertData = insertData;
module.exports.createNewSpreadsheet = createNewSpreadsheet;
module.exports.clearData = clearData
module.exports.copySpreadsheet = copySpreadsheet;
