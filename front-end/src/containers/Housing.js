import React from 'react';
import { Header } from '../components/exporter';
import styles from './Housing.module.css';
import Routing from './routing/Routing';

export default function Housing(props) {

    console.log(props);

    return (
        <div className={styles.Housing}>
            <Header userInfoAndToken={props.userInfoAndToken} loginHandler={props.loginHandler} />
            <Routing userInfoAndToken={props.userInfoAndToken} />
            
        </div>
    )
}
