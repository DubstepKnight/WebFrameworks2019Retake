import React from 'react';
import styles from './HistoryRow.module.css';
import { Button } from '@blueprintjs/core';

const HistoryRow = (props) => {

    console.log('props: ', props);

    const viewTest = () => {
        props.history.push(`/results/${props._id}`);
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

export default HistoryRow;
