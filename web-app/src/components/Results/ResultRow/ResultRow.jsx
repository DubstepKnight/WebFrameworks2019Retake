import React from 'react';
import styles from './ResultRow.module.css';
import { Button } from '@blueprintjs/core';

export const ResultRow = (props) => {

    // console.log('props: ', props);

    const viewTest = () => {
        props.history.push(`/groupResults/${props._id}`)
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.name} </td>
                <td> {props.category} </td>
                <td> 
                    <Button icon="tick" 
                            intent="primary" 
                            small 
                            className={styles.Buttons} 
                            onClick={viewTest} /> 
                </td>
            </tr>
    )
}
