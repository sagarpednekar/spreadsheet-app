import React, { Component } from 'react'

export default class NewSheet extends Component {
  componentWillMount() {
    this.createNewSpreadsheet();
    }
  createNewSpreadsheet=() =>{
    axios.get('/new/spreadsheet')
    .then(res =>{
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
