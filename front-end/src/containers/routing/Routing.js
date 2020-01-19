import React from 'react';
import { LandingPage, Dashboard, CreateTest, EditTest, TakeTest } from '../../Pages/exporter';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function Routing(props) {

    // console.log(props);

    return (
        <>
            <Router>
                {/* <Route path="/" render={routerpProps => (
                    <Header {...routerpProps} />
                )} />   */}
                <Route exact path="/" render={routerProps => (
                    <LandingPage {...routerProps} />
                )} />
                <Route exact path="/dashboard" render={routerProps => (
                    <Dashboard {...routerProps} userInfoAndToken={props.userInfoAndToken} />
                )} />  
                <Route path="/createTest" render={routerProps => (
                    <CreateTest {...routerProps} userInfoAndToken={props.userInfoAndToken} />
                )} />
                <Route path="/editTest" render={routerProps => (
                    <EditTest {...routerProps} userInfoAndToken={props.userInfoAndToken} />
                )} />
                <Route path="/takeTest" render={routerProps => (
                    <TakeTest {...routerProps} userInfoAndToken={props.userInfoAndToken} />
                )} />

            </Router>  
        </>
    )
}
