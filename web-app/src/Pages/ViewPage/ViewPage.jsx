import React, { useState, useEffect } from 'react';
import styles from './ViewPage.module.css';
import axios from 'axios';
import { ExamQuestion } from '../../components/exporter';
import {AppToaster} from '../../components/Toaster/Toaster'

const ViewPage = (props) => {

    // console.log('props: ', props);    

    const [examData, setExamData] = useState();

    let examId;

    useEffect(() => {

        examId = props.match.params.examId;

        // console.log('props.userInfoAndToken.token: ', props.userInfoAndToken.token);

        axios.get(`${process.env.REACT_APP_API_URI}v1/exams/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            // console.log('res.data: ', res.data);
            // console.log('questions: ', {questions: [...res.data.questions]});
            axios.post(`${process.env.REACT_APP_API_URI}v1/questions/get`, 
                { 
                    questions: [...res.data.questions],
                    isRandom: res.data.isRandom,
                    category: res.data.category,
                    numberOfQuestionsIfRandom: res.data.numberOfQuestionsIfRandom
                },
                { headers: { "Authorization": `Bearer ${props.userInfoAndToken.token}`}
            }).then(res => {
                setExamData(res.data);
                // console.log('res.data: ', res.data);
            }).catch(err => {
                AppToaster.show({message: 'Could not load the questions', intent: 'danger'});
                // console.log('err: ', err);
            })
        }).catch(err => {
            AppToaster.show({message: 'Could not load the exams', intent: 'danger'});
        })   
    }, [])

    return (
        <div className={styles.ViewPage} >
            { examData ? 
                examData.map((questions, index) => {
                    return <ExamQuestion {...questions} key={index} />
                }) : null
            }
        </div>
    )
};

export default ViewPage
