import React from 'react';
import styles from './HistoryRow.module.css';
import { Button } from '@blueprintjs/core';

const HistoryRow = (props) => {

    console.log('props: ', props.examId);
    console.log('props.exams: ', props.exams.filter(exam => exam._id === props.examId));

    const viewTest = () => {
        props.history.push(`/results/${props.examId}`);
        // props.history.push(`/dashboard`);
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.examName} </td>
                <td> {props.exams.filter(exam => exam._id === props.examId)[0].category} </td>
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
