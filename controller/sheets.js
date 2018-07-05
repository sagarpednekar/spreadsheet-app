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
function readData(auth, done) { //done -> callback
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    majorDimension: 'ROWS',
    range: 'Sheet1',
  }, (err, { data }) => {
    if (err) return done(err, null)
    const rows = JSON.stringify(data.values);
    return done(null, rows);
  });
}

// to insert the requested data
//POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append

function insertData(auth, data ,done) {
  console.log(data);
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
    range: 'Sheet1',
    valueInputOption: "USER_ENTERED",
    resource: data
  }, (err, {data}) => {
    if (err) {
      console.log(done(err,null));
      return;
    } else {
      console.log("Data added succesfully");
      console.log(data);
      return done(null,data);
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
      "values": [[5, "Mit", 21], [10, "Kajal", 23], [1, "Ajay", 20], [2, "Bhaskar", 28], [3, "karan", 25], [7, "Anand", 27]]
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
/*
POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/sheets/{sheetId}:copyTo

*/
function copySpreadsheet(auth,source,destination,done) {
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
    if (err) console.log(done(err,null));
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
module.exports.insertData = insertData;
module.exports.createNewSpreadsheet = createNewSpreadsheet;
module.exports.clearData = clearData
module.exports.copySpreadsheet = copySpreadsheet
module.exports.updateData = updateData