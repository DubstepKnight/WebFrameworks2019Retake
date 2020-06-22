import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExamQuestion } from '../../components/exporter';
import styles from './TakeTest.module.css';
import { Button } from '@blueprintjs/core';
import { useForm } from 'react-hook-form';

export default function TakeTest(props) {

    const [examData, setExamData] = useState();

    const { register, handleSubmit } = useForm();
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

    const submitter = (data) => {
        console.log('data: ', data);
        // axios.post(`http://localhost:5001/v1/exams/take`, data, {
        //     headers: {
        //         "Authorization": `Bearer ${props.userInfoAndToken.token}`
        //     }
        // })
    }

    return (
        <div className={styles.TakeTest} >
            <form onSubmit={handleSubmit(submitter)} >
                { examData ? 
                    examData.map((questions, index) => {
                        return <ExamQuestion register={register} {...questions} key={index} />
                    }) : null
                }
                <div>
                    <Button text='Cancel Test' 
                            intent='danger' 
                            onClick={() => console.log('this cancels the test entirely')} />
                    <Button text='Submit'
                            intent='success'
                            type='submit'
                            onClick={submitter}
                            />
                </div>
            </form>
        </div>
    )
}
