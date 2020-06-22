import React, { useState} from 'react';
import styles from './ExamQuestion.module.css';
import { Card, H2 } from '@blueprintjs/core';

const ExamQuestion = (props) => {

    console.log('props: ', props);

    const path = window.location.pathname.substring(0, 9);

    const [chosenAnswer, setChosenAnswer] = useState();
    console.log('chosenAnswer: ', chosenAnswer);

    return (
        <Card className={styles.ExamQuestion} >
            <H2> {props.question} </H2>
            <div className={styles.QuestionBody} >
                {
                    path === '/takeTest' ?
                    <div className={styles['radio-group-container']} >
                        {props.options.map((option, index) => {
                            return <li className={styles['option']} >
                                <label for={`question${props._id}.option${index}`} > {option.option} </label>
                                <input type='radio' 
                                        id={`question${props._id}.option${index}`}
                                        name={`question${props._id}`}
                                        ref={props.register}
                                        value={option._id}
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
