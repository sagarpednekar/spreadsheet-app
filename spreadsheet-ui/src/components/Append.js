import React, { Component } from 'react'
import axios from 'axios';

export default class AppendData extends Component {
  componentWillMount() {
    //this.AddDataTOSpreadSheet();
  }

  // axios route to clear the spreadsheet
  AddDataTOSpreadSheet = () => {
    axios.post('/add-data/spreadsheet')
      .then(res => {
        console.log(res);
      })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
