import React, { useEffect } from 'react';
import styles from './ViewPage.module.css';
import axios from 'axios';

const ViewPage = (props) => {

    console.log('props: ', props);    

    let examId;

    useEffect(() => {

        examId = props.match.params.examId;

        axios.get(`https://localhost:5001/v1/exams/${examId}`)
    }, [])

    return (
        <div>

        </div>
    )
};

export default ViewPage
