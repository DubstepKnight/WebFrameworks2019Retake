import React, { useState, useEffect } from 'react';
import styles from "./ResultsPage.module.css";
import axios from 'axios';

export const ResultsPage = (props) => {

    console.log('props: ', props)

    const [studentsTakenTheExam, setStudentsTakenTheExam] = useState([]);
;
    const examId = '';

    useEffect(() => {
        axios.get(`http://localhost:5001/v1/exams/${examId}/history`, {
            headers: {
                "Authorization": `Bearer ${this.props.userInfoAndToken.token}`
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
                {studentsTakenTheExam.map(student => {
                    return <li> {student} </li>
                })}
            </ul>
        </div>
    )
}
