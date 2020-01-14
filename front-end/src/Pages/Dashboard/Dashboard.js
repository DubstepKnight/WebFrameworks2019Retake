import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { InputGroup, UL, Button } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {Tests, Results, History} from '../../components/exporter';

const Dashboard = (props) => {

    // const [activeTab, activeTabSetter] = useState(Tests);

    useEffect(() => {
        // console.log(Tests);
        // console.log({Tests});
        // console.log(activeTab);
        console.log(props.RootState);
    }, []);

    const TabChangerHandler = event => {
        props.RootState.activeTabSetter(event);
        //   console.log(event.target.className);
        console.log(event.currentTarget.id);
        console.log(props.RootState.activeTab);
        // TabLoader()
        
    // console.log(newActiveTab);
    }

    const TabLoader = (activeTab) => {
        // console.log(activeTab);
        let Name = props.RootState.activeTab;
        console.log(<Name />);
        return <Name />;
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.SearchContainer}>
                <InputGroup large intent="primary" type="search" className={styles.SearchBar} placeholder="Find your tests"  />
            </div>
            <div className={styles.MainBoard}>
                <div className={styles.TabsNavBar}>
                    <UL className={styles.TabsNavBarList}>
                        <li>  <Button minimal id="Tests" text="Tests" onClick={TabChangerHandler} /> </li>
                        <li>  <Button minimal id="Results" text="Results" onClick={TabChangerHandler} /> </li>
                        <li>  <Button minimal id="History" text="History" onClick={TabChangerHandler} /> </li>
                    </UL>
                </div>
                <div className={styles.Tabs}>
                    {TabLoader(props.RootState.activeTab)} 
                    {/* sdasdasd */}
                    {/* <Tests /> */}
                </div>
            </div>
        </div>
    )
}

export default inject("RootState")(observer(Dashboard));