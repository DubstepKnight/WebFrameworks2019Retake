import React from 'react';
import styles from './HistoryRow.module.css';
import { Button } from '@blueprintjs/core';

const HistoryRow = (props) => {

    console.log('props: ', props);
    console.log('props.examId: ', props.examId);
    const viewTest = () => {
        props.history.push(`/results/${props.examId}`);
        // props.history.push(`/dashboard`);
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.examName} </td>
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
