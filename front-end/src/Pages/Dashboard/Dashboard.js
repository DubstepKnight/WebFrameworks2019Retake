import React, { useState, useEffect } from 'react';
import { InputGroup, UL, Button } from '@blueprintjs/core';
import styles from './Dashboard.module.css';
import {Tests, Results, History} from '../../components/exporter';

export default function Dashboard() {

    const [activeTab, activeTabSetter] = useState({Tests});

    useEffect(() => {
        console.log(activeTab);
    }, []);

    const TabChanger = event => {
        // let newActiveTab = event.currentTarget.id;
        const components = [
            Tests,
            Results,
            History
          ];
    
        //   console.log(event.target.className);
        console.log(event.currentTarget.id);
    
        // components.map(component => console.log(component.name));
        components.forEach(component => {
            if (component.name === event.currentTarget.id) {
                // console.log(component.name);
                activeTabSetter(component);
                console.log(component);
            } 
        })    
        // console.log(newActiveTab);
    }

    const TabLoader = () => {
        let Name = activeTab;
        // console.log(<Name />);
        // return <Name />;
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.SearchContainer}>
                <InputGroup large intent="primary" type="search" className={styles.SearchBar} placeholder="Find your tests"  />
            </div>
            <div className={styles.MainBoard}>
                <div className={styles.TabsNavBar}>
                    <UL className={styles.TabsNavBarList}>
                        <li>  <Button minimal id="Tests" text="Tests" onClick={TabChanger} /> </li>
                        <li>  <Button minimal id="Results" text="Results" onClick={TabChanger} /> </li>
                        <li>  <Button minimal id="History" text="History" onClick={TabChanger} /> </li>
                    </UL>
                </div>
                <div className={styles.Tabs}>
                    {TabLoader(activeTab)}
                    {/* sdasdasd */}
                </div>
            </div>
        </div>
    )
}
