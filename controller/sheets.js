
// add new sheet
export const newSpreadsheet= function createNewSpreadsheet(auth) {
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
  export const read = function readData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
      spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
      range: 'Sheet1',
    }, (err, { data }) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = JSON.stringify(data);
      console.log(rows);
      return rows;
    });
  }
  
  // to insert the requested data
  //POST https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{range}:append
  
  export const insert = function insertData(auth,data) {
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.append({
      auth: auth,
      spreadsheetId: '1dZ9W0UefQeidkENpCJGRgODwUe2ZVBzTAhg5PowmWQs',
      range: 'Sheet1',
      valueInputOption: "USER_ENTERED",
      resource: data
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
  export const update = function updateData(auth) {
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
  export const copy = function copySpreadsheet(auth) {
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
  export const clear = function clearData(auth) {
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
  
