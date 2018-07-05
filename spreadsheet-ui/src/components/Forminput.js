import React, { Component } from 'react';
import axios from 'axios';
export default class Forminput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            age: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const val = {
            id: this.state.id,
            name: this.state.name,
            age: this.state.age
        }
        console.log(val);
        axios({
            method: 'post',
            url: 'http://localhost:4000/add-data/spreadsheet',
            data: val
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(res => {
                console.log(res);
            })

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    ID:
            </label>
                <input type="text" name="id" onChange={this.handleChange} />
                <label>
                    Name:
            </label>
                <input type="text" name="name" onChange={this.handleChange} />

                <label>
                    Age:
            </label>
                <input type="text" name="age" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}