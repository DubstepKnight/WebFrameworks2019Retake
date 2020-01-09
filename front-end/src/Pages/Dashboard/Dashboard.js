import React, { useState, useEffect } from 'react';
import { InputGroup, UL, Button } from '@blueprintjs/core';
import styles from './Dashboard.module.css';

export default function Dashboard() {

    const [activeTab, activeTabSetter] = useState("Tests");

    useEffect(() => {
        console.log(activeTab);
    }, []);

    const TabChanger = event => {
        let newActiveTab = event.currentTarget.id;
        activeTabSetter(newActiveTab);
        console.log(newActiveTab);
    }

    const TabLoader = () => {
        let Name = activeTab;
        // <Name  />
    }

    return (
        <div className={styles.Dashboard}>
            <div className={styles.SearchContainer}>
                <InputGroup placeholder="Find your tests"  />
            </div>
            <div className={styles.MainBoard}>
                <div className={styles.TabsNavBar}>
                    <UL className={styles.TabsNavBarList}>
                        <li>  <Button id="Tests" text="Tests" onClick={TabChanger} /> </li>
                        <li>  <Button id="Results" text="Results" onClick={TabChanger} /> </li>
                        <li>  <Button id="History" text="History" onClick={TabChanger} /> </li>
                    </UL>
                </div>
                <div className={styles.Tabs}>
                    {/* {TabLoader(activeTab)} */}
                </div>
            </div>
        </div>
    )
}
