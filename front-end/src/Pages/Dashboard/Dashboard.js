import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { InputGroup, UL, Button } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {TestsTable, Results, History} from '../../components/exporter';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: TestsTable,
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

    TabChangerHandler = event => {
        console.log(event.currentTarget.id);
        console.log(event.currentTarget);

        const components = [
            TestsTable,
            Results,
            History
          ];

          components.forEach(component => {
            if (component.name === event.currentTarget.id) {
                this.setState({activeTab: component});
            } 
          })    
    }

    TabLoader = () => {
        // console.log(activeTab);
        // let Name = props.RootState.activeTab;
        let Name = this.state.activeTab;
        return <Name exams={this.state.exams} 
                     filterValue={this.state.filterValue}
                     userInfo={this.props.userInfoAndToken} />;
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
                    <div className={styles.TabsNavBar}>
                        <UL className={styles.TabsNavBarList}>
                            <li>  <Button minimal id="TestsTable" text="Tests" onClick={this.TabChangerHandler} />       </li>
                            <li>  <Button minimal id="Results" text="Results" onClick={this.TabChangerHandler} />   </li>
                            <li>  <Button minimal id="History" text="History" onClick={this.TabChangerHandler} />   </li>
                        </UL>   
                    </div>
                    <div className={styles.Tabs}>
                        {this.TabLoader()} 
                    </div>
                </div>
            </div>
        )
    }
}