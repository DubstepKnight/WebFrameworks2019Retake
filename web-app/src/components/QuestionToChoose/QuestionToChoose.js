import React from 'react';
import { Card, Button } from '@blueprintjs/core';
import styles from './QuestionToChoose.module.css';

const QuestionToChoose = (props) => {

    // console.log(props.question);
    // console.log(props);

    return (
        <Card className={styles.QuestionCard} id={props.key} >
            <div className={styles.QuestionContent}>
                <div className={styles.QuestionName}>
                    <h3 className={styles.Headers} > {props.question.question} </h3>
                </div>
                <div className={styles.QuestionCategory}>
                    <h5 className={styles.Headers} > {props.question.category} </h5>
                </div>
                <div className={styles.QuestionOptions}>
                    <ul className={styles.UnorderedList}>
                        {props.question.options.map(option => <li> Option: {option.option} </li> )}
                    </ul>
                </div>
            </div>
            <div className={styles.QuestionButtons}>
                <Button text="Add question"
                        intent="primary"
                        cardId={props.key}
                        id={props.question._id}
                        questionPoints={props.question.points}    
                        onClick={props.addOneRemoveOne} 
                        />
                
            </div>
        </Card>
    )
}

export default QuestionToChoose
