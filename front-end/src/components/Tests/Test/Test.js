import React from 'react';
import styles from './Test.module.css';
import { Button } from '@blueprintjs/core';

export default function Test(props) {

    const user = {
        isTeacher: true
    }
    
    console.log(props);
    const TakeTest = () => {
        console.log("take");
    }

    const DeleteTest = () => {
        console.log("delete");
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.testName} </td>
                <td> {props.subject} </td>
                <td> {props.category} </td>
                <td> {props.teacher} </td>
                <td> {props.points} </td>
                <td> 
                    { 
                        user.isTeacher ? (
                            <Button icon="edit" intent="primary" small className={styles.Buttons} onClick={TakeTest} />
                        ) : (
                            <Button icon="tick" intent="primary" small className={styles.Buttons} onClick={TakeTest} />
                        )
                       
                    } 
                </td>
                <td> <Button icon="cross" intent="danger" small className={styles.Buttons} onClick={DeleteTest}/> </td>
                <td> {props.createdAt} </td>
                <td> {props.dueDate} </td>
            </tr>
    )
}
