import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router';

export default function Routing() {
    return (
        <>
            <Router>
                <Route path="/" render={routerpProps => (
                    <Header {...routerpProps} />
                )} />  
                <Route exact path="/" render={routerProps => (
                    <LandingPage {...routerProps} />
                )} />
                <Route exact path="/dashboard" render={routerProps => (
                    <Dashboard {...routerProps} />
                )} />  
                <Route path="/createTest" render={routerProps => (
                    <CreateTest {...routerProps} />
                )} />
                <Route path="/editTest" render={routerProps => (
                    <EditTest {...routerProps} />
                )} />
                <Route path="/takeTest" render={routerProps => (
                    <TakeTest {...routerProps} />
                )} />

            </Router>  
        </>
    )
}
