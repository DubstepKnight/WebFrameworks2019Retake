import React, { useState, useEffect } from 'react';
import styles from './QuestionCard.module.css';
import { Card, Button } from '@blueprintjs/core';

export const QuestionCard = (props) => {

    console.log('props: ', props);

    return (
        <Card className={styles.QuestionCard} >
            <div className={styles.MainContent} >
                <h3> {props.question} </h3>
                <h4> {props.category} </h4>
                <div className={styles.Questions}>
                    <ul>
                        {
                            props.options.map(option => <li> {option.option} </li> ) 
                        }
                    </ul>
                </div>
                <p>
                    {props.points}
                </p>
            </div>
        </Card>
    )
}
