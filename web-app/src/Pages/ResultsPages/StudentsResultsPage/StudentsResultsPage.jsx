import React, { useState, useEffect } from 'react';
import styles from "./StudentsResultsPage.module.css";
import axios from 'axios';
import { NonIdealState, Button, HTMLTable } from '@blueprintjs/core';

export const StudentsResultsPage = (props) => {

    console.log('props: ', props)

    const [studentsTakenTheExam, setStudentsTakenTheExam] = useState([]);
    const [takenExamsByStudent, setTakenExamsByStudent] = useState();
;
    let examId = '';
    let userId = props.userInfoAndToken.userInfo._id;
    console.log('userId: ', userId);

    useEffect(() => {
        console.log('this is not teacher');
        axios.get(`http://localhost:5001/v1/exams/history/${userId}/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res: ', res.data);
            setTakenExamsByStudent(res.data);
        }).catch(err => {
            console.log('err: ', err);
        })
    }, [])

    console.log('takenExamsByStudent: ', takenExamsByStudent);

    return (
        <div className={styles['results-page']} >
            <ul>
                {
                    studentsTakenTheExam.length ? studentsTakenTheExam.map(student => {
                        return <li> {student} </li>
                    }) : takenExamsByStudent && takenExamsByStudent.name ? takenExamsByStudent.attempts.map((attempt, index) => {
                        return <section key={index} >
                            <details>
                                <summary> Attempt number {index + 1} </summary>
                                <HTMLTable>
                                    <thead>
                                        <tr>
                                            <th> Question </th>
                                            <th> Answer </th>
                                            <th> Right Answer </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attempt.questions.map((question, index) => {
                                            return <tr key={index} >
                                                <td> {question.question} </td>
                                                <td> {question.answer} </td>
                                                <td> {question.rightAnswer} </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </HTMLTable>
                            </details>
                        </section>
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
