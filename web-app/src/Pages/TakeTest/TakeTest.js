import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExamQuestion } from '../../components/exporter';
import styles from './TakeTest.module.css';
import { Button } from '@blueprintjs/core';

export default function TakeTest(props) {

    const [examData, setExamData] = useState();
    let examId;

    useEffect(() => {

        examId = props.match.params.id;

        console.log('props.match.params: ', props.match.params);
        console.log('examId: ', examId);

        console.log('props.userInfoAndToken.token: ', props.userInfoAndToken.token);

        axios.get(`http://localhost:5001/v1/exams/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res.data: ', res.data);
            console.log('questions: ', {questions: [...res.data.questions]});
            axios.post(`http://localhost:5001/v1/questions/get`, 
                { 
                    questions: [...res.data.questions],
                    isRandom: res.data.isRandom,
                    category: res.data.category,
                    numberOfQuestionsIfRandom: res.data.numberOfQuestionsIfRandom
                },
                { headers: { "Authorization": `Bearer ${props.userInfoAndToken.token}`}
            }).then(res => {
                setExamData(res.data);
                console.log('res.data: ', res.data);
            }).catch(err => {
                console.log('err: ', err);
            })
        }).catch(err => {
            console.log('err: ', err);
        })   
    }, [])

    const handleSubmit = () => {
        console.log('handles submit')
    }

    return (
        <div className={styles.TakeTest} >
            <div>
                { examData ? 
                    examData.map((questions, index) => {
                        return <ExamQuestion {...questions} key={index} />
                    }) : null
                }
            </div>
            <div>
                <Button text='Cancel Test' 
                        intent='danger' 
                        onClick={() => console.log('this cancels the test entirely')} />
                <Button text='Submit'
                        intent='success'
                        onClick={handleSubmit} />
            </div>
        </div>
    )
}
