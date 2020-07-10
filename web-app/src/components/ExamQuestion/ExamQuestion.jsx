import React from 'react';
import styles from './ExamQuestion.module.css';
import { Card, H2 } from '@blueprintjs/core';

const ExamQuestion = (props) => {

    // console.log('props: ', props);

    const path = window.location.pathname.substring(0, 9);

    return (
        <Card className={styles.ExamQuestion} >
            <H2> {props.question} </H2>
            <div className={styles.QuestionBody} >
                {
                    path === '/takeTest' ?
                    <div className={styles['radio-group-container']} >
                        {props.options.map((option, index) => {
                            return <li className={styles['option']} >
                                <input name={`questions[${props.index}].question.id`} 
                                       ref={props.register} 
                                       style={{display: 'none'}}
                                       value={`${props._id}`} />
                                <input name={`questions[${props.index}].question.questionItself`} 
                                       ref={props.register} 
                                       style={{display: 'none'}}
                                       value={`${props.question}`} />
                                { option.isCorrect && 
                                <input name={`questions[${props.index}].rightAnswer`} 
                                       ref={props.register} 
                                       style={{display: 'none'}}
                                       value={option.option} />}
                                <input type='radio' 
                                        id={`questions[${props.index}].answer${index}`}
                                        name={`questions[${props.index}].answer`}
                                        ref={props.register}
                                        value={option.option} />
                                <label for={`questions[${props.index}].answer${index}`} > {option.option} </label>
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
