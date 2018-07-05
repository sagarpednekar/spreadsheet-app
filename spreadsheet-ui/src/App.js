import React, { Component } from 'react';
import MiniDrawer from './components/layouts/Navbar';
import ReadSpreadSheet from './components/ReadSpreadSheet';
import Append from './components/Append';
import Forminput from './components/Forminput';
import CreateSpreadsheet from './components/NewSpreadSheet';
import ClearSpreadSheet from './components/ClearSheet';
import CopySpreadSheet from './components/CopySpreadSheet';

export default class App extends Component {
    render() {
        return (
            <div>
                <ReadSpreadSheet />
                <Append />
                <CreateSpreadsheet />
                <ClearSpreadSheet />
                <CopySpreadSheet />
            </div>
        );
    }
}

