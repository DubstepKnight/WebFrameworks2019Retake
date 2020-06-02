import React from 'react';
import axios from 'axios';
// import {useHistory} from 'react-router-dom';
import styles from './ResultRow.module.css';
import { Button } from '@blueprintjs/core';

export const ResultRow = (props) => {

    const viewTest = () => {
        if ( props.userInfo.userInfo.isTeacher ) {
            props.history.push(`/results/${props._id}`)
        }
        if ( !props.userInfo.userInfo.isTeacher ) {
            // props.history.push(`/results/${props._id}`)
            console.log('some other way to validate stuff')
        }
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.name} </td>
                <td> {props.category} </td>
                <td> {props.maximumPoints} </td>
                <td> 
                    {/* { 
                        props.userInfo.userInfo.isTeacher ? (
                            <Button icon="tick" intent="primary" small className={styles.Buttons} onClick={viewTest} />
                        ) : (
                            <Button icon="tick" intent="primary" small className={styles.Buttons} onClick={takeTest} />
                        )
                    }  */}
                    <Button icon="tick" intent="primary" small className={styles.Buttons} onClick={viewTest} />
                </td>
                <td> {props.createdAt.substring(0, 10)} </td>
                {/* <td> {props.dueDate} </td> */}
            </tr>
    )
}
