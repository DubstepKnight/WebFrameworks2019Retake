import React, { useState, useEffect } from 'react';
import styles from './QuestionCard.module.css';
import { Card, Button } from '@blueprintjs/core';

export const QuestionCard = (props) => {

    console.log('props: ', props);

    return (
        <Card className={styles.QuestionCard} >
            <div className={styles.MainContent} >
                <h3> {props.question} </h3>
                <h4> {props.ategory} </h4>
                <div className={styles.Questions}>
                    <ul>
                        {
                            props.options.map(option => <li> {option.option} </li> ) 
                        }
                    </ul>
                </div>
                <p>
                    {/* {props.points} */}
                </p>
            </div>
            <div className={styles.Buttons} >
                <Button intent='primary'
                        onClick={() => console.log('this button was pressed, yeah!')} 
                        minimal
                        icon='edit'
                        className={styles.EditButton} />
                <Button intent='danger'
                        onClick={() => console.log('The delete button has been pressed!')} 
                        icon='trash'
                        className={styles.DeleteButton} />
            </div>
        </Card>
    )
}
