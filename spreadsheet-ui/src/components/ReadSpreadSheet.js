import React, { Component } from "react";
import axios from 'axios';
export default class ReadSheet extends Component {
    constructor() {
        super()
        this.state = { sheets: [] };
    }

    componentWillMount() {
        this.getData();
        }

    getData = () => {
        axios.get('/getdata')
            .then(res => {
                const sheets = res.data;
                this.setState({ sheets });
            })
    }

 
    // axios route for update
    updateSpreadSheet = () =>{
        axios.put()
        .then(res=>{

        })
    }
    // axios route to clear the spreadsheet
    clearSpreadSheet = () =>{
        axios.get()
        .then(res=>{
            
        })
    }
    // axios route to 1 spreadsheet to other
    copySpreadSheet = () =>{
        axios.put()
        .then(res=>{
            
        })
    }

    render() {
        const { sheets } = this.state;
        return (
            <div className="container-fluid">
                <div className="App">
                    <h1>Users Listing</h1>
                    <div className="row">
                        <ul>
                            {sheets.map((sheet, i) =>
                                <li key={i}>
                                    User { i} : { sheet }<br></br>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}