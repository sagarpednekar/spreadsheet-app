import React, { Component } from 'react';
import MiniDrawer from './components/layouts/Navbar';
import ReadSpreadSheet from './components/ReadSpreadSheet';
import Forminput from './components/Forminput';
export default class App extends Component {
    render() {
        return (
            <div>
                <ReadSpreadSheet />
            </div>
        );
    }
}

