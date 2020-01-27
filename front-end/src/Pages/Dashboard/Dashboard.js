import React from 'react';
import { InputGroup, UL, Button } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {TestsTable, Results, History} from '../../components/exporter';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: TestsTable,
            filterValue: ""
        }
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
        return <Name filterValue={this.state.filterValue} />;
    }

    Filter = event => {
        console.log(event.currentTarget.value);
        this.setState({filterValue: event.currentTarget.value});
    }


    render() {
        return (
            <div className={styles.Dashboard}>
                <div className={styles.SearchContainer}>
                    <InputGroup onChange={this.Filter} value={this.state.filterValue} large intent="primary" type="search" className={styles.SearchBar} placeholder="Find your tests"  />
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