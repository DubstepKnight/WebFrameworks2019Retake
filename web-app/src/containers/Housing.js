import React from 'react';
import styles from './Housing.module.css';
import Routing from './routing/Routing';

export default function Housing(props) {

    console.log(props);

    return (
        <div className={styles.Housing}>
            <Routing userInfoAndToken={props.userInfoAndToken}
                     loginHandler={props.loginHandler}
                     logOutHandler={props.logOutHandler} />
            
        </div>
    )
}
