import React, { useState} from 'react';
import styles from './ExamQuestion.module.css';
import { Card, H2, Radio, RadioGroup } from '@blueprintjs/core';
import AnswerOptions from '../AnswerOptions/AnswerOptions';

const ExamQuestion = (props) => {

    console.log('props: ', props);

    const path = window.location.pathname.substring(0, 9);
    console.log('path: ', path);

    const [chosenAnswer, setChosenAnswer] = useState();

    return (
        <Card className={styles.ExamQuestion} >
            <H2> {props.question} </H2>
            <div className={styles.QuestionBody} >
                {
                    path === '/takeTest' ?
                    <div className={styles['radio-group-container']} >
                        {props.options.map((option, index) => {
                            return <li className={styles['option']} >
                                <label for={`option${index}`} > {option.option} </label>
                                <input type='radio' 
                                            id={`option${index}`}
                                            name={'isCorrect'}
                                            value={option}
                                            onChange={() => setChosenAnswer(option.option)} />
                            </li>
                        })}
                    </div> 
                    :
                    <ul>
                        {props.options.map(option => {
                            return <li> {option.option} </li>
                        })}
                    </ul> 
                }
            </div>
        </Card>
    )
}

export default ExamQuestion
