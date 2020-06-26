import React, { useState, useEffect } from 'react';
import styles from "./ResultsPage.module.css";
import axios from 'axios';
import { NonIdealState, Button } from '@blueprintjs/core';

export const ResultsPage = (props) => {

    console.log('props: ', props)

    const [studentsTakenTheExam, setStudentsTakenTheExam] = useState([]);
;
    let examId = '';

    useEffect(() => {

        examId = props.match.params.examId;

        axios.get(`http://localhost:5001/v1/exams/${examId}/history`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res: ', res);
            setStudentsTakenTheExam(res);
        }).catch(err => {
            console.log('err: ', err);
        })
    }, [])

    return (
        <div>
            <ul>
                {
                    studentsTakenTheExam.length ? studentsTakenTheExam.map(student => {
                        return <li> {student} </li>
                    }) : <NonIdealState title='It is empty here'
                                        description='No one has ever tried to take this exam yet'
                                        icon='warning-sign'
                                        action={<Button onClick={() => props.history.goBack()}
                                                        text='Go back'
                                                        intent='primary' />} >

                    </NonIdealState>
                }
            </ul>
        </div>
    )
}
