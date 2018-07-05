import React, { Component } from 'react'
import axios from 'axios';

export default class CopySheet extends Component {
  componentWillMount() {
    this.CopySpreadSheet();
  }

  CopySpreadSheet = () => {
    axios.post('/clear/spreadsheet')
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
