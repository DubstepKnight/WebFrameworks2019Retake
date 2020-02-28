import React from 'react';
import { LandingPage, Dashboard, CreateTest, EditTest, TakeTest, QuestionsControlPage } from '../../Pages/exporter';
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

                <ProtectedRoute exact path="/dashboard" userInfoAndToken={props.userInfoAndToken} component={Dashboard} />

                <SuperProtectedRoute exact path="/createTest" userInfoAndToken={props.userInfoAndToken} component={CreateTest} />
                    
                <SuperProtectedRoute exact path="/questionsControlPage" userInfoAndToken={props.userInfoAndToken} component={QuestionsControlPage} />

                <SuperProtectedRoute exact path="/editTest" userInfoAndToken={props.userInfoAndToken} component={EditTest} />
                    
                <ProtectedRoute exact path="/takeTest" userInfoAndToken={props.userInfoAndToken} component={TakeTest} />

            </Switch>  
        </Router>
    )
}
