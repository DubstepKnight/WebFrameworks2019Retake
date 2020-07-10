import React, { useState, useEffect } from 'react';
import styles from "./StudentsResultsPage.module.css";
import axios from 'axios';
import { AppToaster } from '../../../components/exporter';
import { NonIdealState, Button, HTMLTable, Spinner } from '@blueprintjs/core';

export const StudentsResultsPage = (props) => {

    console.log('props: ', props)

    const [takenExamsByStudent, setTakenExamsByStudent] = useState();
    const [isLoading, setIsLoading] = useState(false);
;
    let examId = '';
    let userId = props.userInfoAndToken.userInfo._id;
    console.log('userId: ', userId);

    useEffect(() => {
        examId = props.match.params.examId;
        console.log('this is not teacher');
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_URI}v1/exams/history/${userId}/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res: ', res.data);
            setTakenExamsByStudent(res.data);
            setIsLoading(false);
            if ( res.data.errors ) {
                AppToaster.show({ message: "Could not load the questions", intent: 'danger' });
            }
        }).catch(err => {
            console.log('err: ', err);
            setIsLoading(false);
            AppToaster.show({ message: "Could not load the questions", intent: 'danger' });
        })
    }, [])

    console.log('takenExamsByStudent: ', takenExamsByStudent);

    return (
        <div>
            <section className={styles['results-page']} > 
                {
                    isLoading ? <Spinner intent='primary' size={50} /> :
                    takenExamsByStudent && takenExamsByStudent.name ? takenExamsByStudent.attempts.map((attempt, index) => {
                        return (
                            <section key={index} >
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
                                                    <td> {question.question.questionItself} </td>
                                                    <td> {question.answer} </td>
                                                    <td> {question.rightAnswer} </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </HTMLTable>
                                </details>
                            </section>
                        )
                    })
                    : <NonIdealState title='It is empty here'
                                        description='No one has ever tried to take this exam yet'
                                        icon='warning-sign'
                                        className={styles['non-ideal-state']}
                                        action={<Button onClick={() => props.history.goBack()}
                                                        text='Go back'
                                                        intent='primary' />} >

                    </NonIdealState>
                }
            </section>
        </div>
    )
}
