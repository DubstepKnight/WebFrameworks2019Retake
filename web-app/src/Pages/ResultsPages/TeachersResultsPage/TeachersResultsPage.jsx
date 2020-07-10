import React, { useState, useEffect } from 'react';
import styles from "./TeachersResultsPage.module.css";
import axios from 'axios';
import { NonIdealState, Button, HTMLTable } from '@blueprintjs/core';

export const TeachersResultsPage = (props) => {

    console.log('props: ', props)

    const [studentsTakenTheExam, setStudentsTakenTheExam] = useState([]);
;
    let examId = '';
    let userId = props.userInfoAndToken.userInfo._id;
    console.log('userId: ', userId);

    useEffect(() => {
        examId = props.match.params.examId;
        axios.get(`${process.env.REACT_APP_API_URI}v1/exams/${examId}/history`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res: ', res.data);
            setStudentsTakenTheExam(res.data);
        }).catch(err => {
            console.log('err: ', err);
        })
    }, [])

    console.log('studentsTakenTheExam: ', studentsTakenTheExam);

    return (
        studentsTakenTheExam.length ? <HTMLTable className={styles['students-table']} 
                    striped
                    interactive >
            {/* <li> {exam.takenBy.username} </li> */}
            <thead>
                <tr>
                    <th> Username </th>
                    <th> Correct/total answers </th>
                    <th> View </th>
                </tr>
            </thead>
            <tbody>
                {studentsTakenTheExam.map(exam => {
                    return (
                        <tr> 
                            <td> {exam.takenBy.username} </td>    
                            <td> {exam.correctAnswers}/{exam.totalNumberOfQuestions} </td>    
                            <td> 
                                <Button icon='eye-open'
                                        onClick={() => props.history.push(`/results/${props.match.params.examId}/${exam.takenBy.userId}`) } 
                                        intent='primary' />   
                            </td>    
                        </tr>
                    )
                })}
            </tbody>
        </HTMLTable> : <NonIdealState title='It is empty here'
                            description='No one has ever tried to take this exam yet'
                            icon='warning-sign'
                            className={styles['results-page']}
                            action={<Button onClick={() => props.history.goBack()}
                                            text='Go back'
                                            intent='primary' />} >
             </NonIdealState>
    )
}
