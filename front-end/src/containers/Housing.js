import React from 'react';
import { Header } from '../components/exporter';
import styles from './Housing.module.css';
import Routing from './routing/Routing';

export default function Housing() {
    return (
        <div className={styles.Housing}>
            <Header  />
            <Routing />
            
        </div>
    )
}
