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
        axios.get('/')
            .then(res => {
                const sheets = res.data;
                this.setState({ sheets });
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
                            {sheets}
                            {/* {sheets.map((sheet, i) =>
                                <li key={i}>
                                    User { i} : { sheet  }
                                </li>
                            )} */}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}