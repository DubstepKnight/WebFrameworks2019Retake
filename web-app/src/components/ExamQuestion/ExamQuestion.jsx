import React from 'react';
import styles from './ExamQuestion.module.css';
import { Card, H2 } from '@blueprintjs/core';

const ExamQuestion = (props) => {

    // console.log('props: ', props);    

    return (
        <Card className={styles.ExamQuestion} >
            <H2> {props.question} </H2>
            <div className={styles.QuestionBody} >
                <ul>
                    {props.options.map(option => {
                        return <li> {option.option} </li>
                    })}
                </ul>
            </div>
        </Card>
    )
}

export default ExamQuestion
