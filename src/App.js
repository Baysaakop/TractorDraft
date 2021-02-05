import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import CustomLayout from './layout/Layout';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {            
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div className="App">
                <HashRouter> 
                    <CustomLayout {...this.props}>
                        <BaseRouter />
                    </CustomLayout>
                </HashRouter>
            </div>
        );
    }    
}
    
const mapStateToProps = state => {
    return {        
        username: state.username
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
