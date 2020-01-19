import React from 'react';
import styles from './Footer.module.css';
// import { InputGroup } from '@blueprintjs/core';


export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.AboutMe}>
                Me and only me
                {/* <InputGroup type="search" /> */}
                {/* <TextInput /> */}
            </div>
            <div className={styles.Technologies}>
                React, BLueprintJS, GraphJS
            </div>
            <div className={styles.Contacts}>
                nurmaster@gmail.com
            </div>
            <div className={styles.Copyleft}>
                2020 made by a madman for a grade
            </div>
        </div>
    )
}
