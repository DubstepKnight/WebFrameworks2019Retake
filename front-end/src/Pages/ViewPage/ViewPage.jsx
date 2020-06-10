import React, { useState, useEffect } from 'react';
import styles from './ViewPage.module.css';
import axios from 'axios';
import { ExamQuestion } from '../../components/exporter';

const ViewPage = (props) => {

    console.log('props: ', props);    

    const [examData, setExamData] = useState();

    let examId;

    useEffect(() => {

        examId = props.match.params.examId;

        axios.get(`http://localhost:5001/v1/exams/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res.data: ', res.data);
            console.log('questions: ', {questions: [...res.data.questions]});
            axios.get(`http://localhost:5001/v1/questions`, 
                { params: {questions: [...res.data.questions]}},
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
