import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { InputGroup, UL, Button, Tabs, Tab } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {TestsTable, Results, History} from '../../components/exporter';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            exams: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:5001/v1/exams/", {
            headers: {
                "Authorization": `Bearer ${this.props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.table(res.data.exams);
            this.setState({exams: res.data.exams});
            // setQuestions(res.data);
        }).catch(error => {
            console.log(error)
        }) 
    }

    Filter = event => {
        console.log(event.currentTarget.value);
        this.setState({filterValue: event.currentTarget.value});
    }

    render() {

        console.log(this.props.userInfoAndToken.userInfo.isTeacher);

        return (
            <div className={styles.Dashboard}>
                <div className={styles.SearchContainer}>
                    <InputGroup onChange={this.Filter} 
                                value={this.state.filterValue} 
                                large 
                                intent="primary" 
                                type="search" 
                                className={styles.SearchBar} 
                                placeholder="Find your tests"  />
                    <div className={styles.CreateTestButton}>
                        {
                           this.props.userInfoAndToken.userInfo.isTeacher 
                           ? <div className={styles.Buttons} > 
                                <Button intent="success" onClick={() => this.props.history.push('/createTest')} text="Create Test"/>
                                <Button intent="success" onClick={() => this.props.history.push('/questionsControlPage')} minimal text="Questions Controller"/> 
                            </div> : null 
                        } 
                    </div>
                </div>
                <div className={styles.MainBoard}>
                    <Tabs id='tabs' 
                          animate 
                          vertical
                          renderActiveTabPanelOnly
                            >
                        <Tab id='testTable' 
                             title='Exams' 
                             panel={<TestsTable exams={this.state.exams} 
                                                filterValue={this.state.filterValue}
                                                history={this.props.history}
                                                userInfo={this.props.userInfoAndToken} />} />

                        { 
                            this.props.userInfoAndToken.userInfo.isTeacher
                            ?
                            <Tab id='results' 
                                 title='Results' 
                                 panel={<Results exams={this.state.exams} 
                                                 filterValue={this.state.filterValue}
                                                 history={this.props.history}
                                                 userInfo={this.props.userInfoAndToken} />} />
                            : 
                            <Tab id='history' 
                                 title='History' 
                                 panel={<History exams={this.state.exams} 
                                                 filterValue={this.state.filterValue}
                                                 history={this.props.history}
                                                 userInfo={this.props.userInfoAndToken} />} />
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}