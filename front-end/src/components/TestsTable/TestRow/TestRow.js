import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import styles from './Test.module.css';
import { Button } from '@blueprintjs/core';

export default function TestRow(props) {

    console.log(props.userInfo.userInfo._id);
    // console.log(props.userInfo._id);

    const history = useHistory();

    const EditTest = () => {
        history.push(`/editTest/${props._id}`)
    }
    
    const TakeTest = () => {
        history.push(`/takeTest/${props._id}`)
    }

    const DeleteTest = () => {
        // axios.delete(`http://localhost:5001/v1/exams/${props.userInfo._id}`, {
        //     headers: {
        //         "Authorization": `Bearer ${props.userInfo.token}`
        //     }
        // }).then(res =>{
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error);
        // })
        console.log("deleted");
    }

    return (
            <tr className={styles.TestRow}>
                <td> {props.name} </td>
                <td> {props.category} </td>
                <td> {props.maximumPoints} </td>
                <td> 
                    { 
                        props.userInfo.userInfo.isTeacher ? (
                            <Button icon="edit" intent="primary" small className={styles.Buttons} onClick={EditTest} />
                        ) : (
                            <Button icon="tick" intent="primary" small className={styles.Buttons} onClick={TakeTest} />
                        )
                    } 
                </td>
                { props.userInfo.userInfo.isTeacher ? <td> <Button icon="cross" intent="danger" small className={styles.Buttons} onClick={DeleteTest}/> </td> : null }  
                <td> {props.createdAt.substring(0, 10)} </td>
                {/* <td> {props.dueDate} </td> */}
            </tr>
    )
}
