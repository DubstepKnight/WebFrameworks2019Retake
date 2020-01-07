import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.Footer}>
            <div className={styles.AboutMe}>
                Me and only me
            </div>
            <div className={styles.Technologies}>
                React, MobX, BLueprintJS, GraphJS
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
