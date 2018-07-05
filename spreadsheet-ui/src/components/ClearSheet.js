import React, { Component } from 'react'
import axios from 'axios';

export default class ClearSheet extends Component {
  componentWillMount() {
  //  this.clearSpreadSheet();
  }

  // axios route to clear the spreadsheet
  clearSpreadSheet = () => {
    axios.get('/clear/spreadsheet')
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
