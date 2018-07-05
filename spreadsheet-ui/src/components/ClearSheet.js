import React, { Component } from 'react'

export default class ClearSheet extends Component {
    componentWillMount() {
        this.clearSpreadSheet();
        }

       // axios route to clear the spreadsheet
       clearSpreadSheet = () =>{
        axios.get()
        .then(res=>{
            
        })
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
