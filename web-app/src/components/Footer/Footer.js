import React from 'react';
import styles from './Footer.module.css';
// import { InputGroup } from '@blueprintjs/core';


export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.AboutMe}>
                Me and only me
            </div>
            <div className={styles.Technologies}>
                React, BlueprintJS, MongoDB 
            </div>
            <div className={styles.Contacts}>
                nurmaster@gmail.com
            </div>
            <div className={styles.Copyleft}>
                Testy 2020
            </div>
        </div>
    )
}
