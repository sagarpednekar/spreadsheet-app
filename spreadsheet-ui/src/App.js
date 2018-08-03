import React, { Component } from 'react';
import Auth from './Auth/Auth';
import ReadSpreadSheet from './components/ReadSpreadSheet'
import { withCookies } from 'react-cookie';
import { Switch, Route} from 'react-router-dom';
import Callback from './Auth/Callback'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: props.auth,
            history: props.history
        }
    }

    componentWillMount() {
        const { cookies } = this.props;
        this.setState({
            authCode: cookies.get('authCode') || '',
            auth: new Auth(cookies)
        });
    }
    handleAuthentication({ location, history }) {
        if (/access_token|id_token|error/.test(location.hash)) {
            console.log("I am called");
            this.state.auth.handleAuthentication(history);
        }
    }
    login = () => {
        this.state.auth.login();
    }

    logout = () => {
        this.state.auth.logout(this.props.history);
    }
    handleAction = (event, action) => {
        event.preventDefault();
        this.props.onClick(event, action);
    }
    render() {
        const { isAuthenticated } = this.state.auth;
        return (
            <div>
                <Switch >
                    <Route path="/callback" render={(props) =>{
                        console.log("Inside callback");
                        this.handleAuthentication(props);
                        return <Callback { ...props} />
                        
                    }}/>
                         
                </Switch>
                {
                    !isAuthenticated() && (
                        <div>
                            <button type="button" id="qsLoginBtn" onClick={this.login}>Login</button>
                            <h1> Welcome</h1>
                        </div>
                    )
                }
                {
                    isAuthenticated() && (
                        <div>
                            <button type="button" id="qsLoginBtn" onClick={this.logout}>Logout</button>
                            <ReadSpreadSheet/>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default withCookies(App)

