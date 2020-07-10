import React from 'react';
import axios from 'axios';
import { InputGroup, Button, Tabs, Tab } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {TestsTable, Results, History} from '../../components/exporter';
import {AppToaster} from '../../components/Toaster/Toaster'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            exams: []
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URI}v1/exams/`, {
            headers: {
                "Authorization": `Bearer ${this.props.userInfoAndToken.token}`
            }
        }).then(res => {
            // console.table(res.data.exams);
            let flags = [], output = [], l = res.data.exams.length, i;
            for (i = 0; i < l; i++) {
                if ( this.props.userInfoAndToken.userInfo.isTeacher ) {
                    output = res.data.exams;
                } 
                if ( !this.props.userInfoAndToken.userInfo.isTeacher ) {
                    if ( res.data.exams[i].personalFor && res.data.exams[i].personalFor !== this.props.userInfoAndToken.userInfo._id ) continue;
                    flags[res.data.exams[i].personalFor] = true;
                    output.push(res.data.exams[i])
                }
            }
            // console.log('output: ', output);
            if ( res.data.errors ) {
                AppToaster.show({message: 'Could not load the exams', intent: 'danger'});
            } else {
                this.setState({exams:  output});
            }
        }).catch(error => {
            // console.log(error)
            AppToaster.show({message: 'Could not load exams', intent: 'danger'});
        }) 
    }

    Filter = event => {
        // console.log(event.currentTarget.value);
        this.setState({filterValue: event.currentTarget.value});
    }

    render() {

        // console.log('process.env.REACT_APP_API_URI: ', process.env.REACT_APP_API_URI);
        // console.log(this.props.userInfoAndToken.userInfo._id);

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