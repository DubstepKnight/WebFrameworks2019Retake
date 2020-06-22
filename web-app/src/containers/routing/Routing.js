import React from 'react';
import { LandingPage, Dashboard, CreateTest, TakeTest, QuestionsControlPage, ResultsPage, ViewPage } from '../../Pages/exporter';
import { Header } from '../../components/exporter';
import ProtectedRoute from './ProtectedRoute';
import SuperProtectedRoute from './SuperProtectedRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function Routing(props) {

    return (
        <Router>
            <Route path="/" component={() => <Header userInfoAndToken={props.userInfoAndToken}
                                    loginHandler={props.loginHandler}
                                    logOutHandler={props.logOutHandler} />}
            />  
            <Switch>
                <Route exact path="/" component={LandingPage} />

                <ProtectedRoute exact path="/dashboard" 
                                userInfoAndToken={props.userInfoAndToken} 
                                component={Dashboard} />
                <ProtectedRoute exact path="/takeTest/:id" 
                                userInfoAndToken={props.userInfoAndToken} 
                                component={TakeTest} />

                <SuperProtectedRoute exact path="/createTest" 
                                     userInfoAndToken={props.userInfoAndToken} 
                                     component={CreateTest} />
                <SuperProtectedRoute exact path="/questionsControlPage" 
                                     userInfoAndToken={props.userInfoAndToken} 
                                     component={QuestionsControlPage} />
                <SuperProtectedRoute exact path="/results/:examId" 
                                     userInfoAndToken={props.userInfoAndToken} 
                                     component={ResultsPage} />
                <SuperProtectedRoute exact path="/view/:examId" 
                                     userInfoAndToken={props.userInfoAndToken} 
                                     component={ViewPage} />

            </Switch>  
        </Router>
    )
}