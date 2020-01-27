import React, { useState } from 'react';
import { Card, Button, Alert } from '@blueprintjs/core';
import styles from './CreateTest.module.css';

export default function CreateTest(props) {

    const [answers, setAnswers] = useState({
        type: '',
        questions: [
            {
                question: '',
                category: ''
            }
        ],
        name: ''   
    });
    const [inputFields, setInputFields] = useState([
        
    ]);

    const onChangeHandler = event => {
        setAnswers(prevState => {
            return {
                ...prevState,
                [event.target.id]: event.target.value
            }
        })
    }

    const SubmitTest = () => {
        console.log("submitted");
        // API request here
    }

    const Cancel = () => {
        console.log("cancels");
        return(
            <Alert  className={styles.Alert}>
                <p> some stuff </p>
            </Alert>
        )
    }

    console.log(props);

    return (
        <div className={styles.CreateTest}>
            <Card className={styles.CreateTestCard}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className={styles.Submit}>
                    <Button text="Cancel"
                            large
                            intent="danger"
                            onClick={Cancel} />
                    <Button text="Submit"
                            large 
                            intent="success" 
                            onClick={SubmitTest} />
                </div>
            </Card>
        </div>
    )
}
