import React, { useState, useEffect } from 'react';
import styles from './QuestionCard.module.css';
import { Card, Button } from '@blueprintjs/core';

export const QuestionCard = (props) => {

    console.log('props: ', props);

    return (
        <Card className={styles.QuestionCard} >
            <div className={styles.MainContent} >
                <h3> Question title </h3>
                <h4> Question category </h4>
                <div className={styles.Questions}>
                    <ul>
                        <li> question 1 </li>
                        <li> question 2 </li>
                        <li> question 3 </li>
                    </ul>
                </div>
            </div>
            <div className={styles.Buttons} >
                <Button text='Nice' 
                        intent='primary'
                        onClick={() => console.log('this button was pressed, yeah!')} 
                        icon='edit'
                        className={styles.EditButton} />
                <Button text='Delete' 
                        intent='danger'
                        onClick={() => console.log('The delete button has been pressed!')} 
                        icon='trash'
                        className={styles.DeleteButton} />
            </div>
        </Card>
    )
}
