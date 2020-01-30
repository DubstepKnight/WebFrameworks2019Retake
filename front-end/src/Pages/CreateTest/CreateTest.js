import React, { useState } from 'react';
import { TestInputField } from '../../components/exporter';
import { Card, Button, Alert, Switch } from '@blueprintjs/core';
import styles from './CreateTest.module.css';

export default function CreateTest(props) {

    const [isRandomSubState, setIsRandomSubState] = useState(false);
    const [answers, setAnswers] = useState({
        isRandom: isRandomSubState,
        name: '',   
        questions: [
            {
                question: '',
                category: ''
            }
        ],
    });
    const [inputFields, setInputFields] = useState([
        
    ]);

    const onChangeIsRandom = () => {
        setIsRandomSubState(!isRandomSubState);
        setAnswers(prevState => {
            return {
                ...prevState,
                isRandom: isRandomSubState
            }
        });
        console.log('it works');
    }

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
    console.log(answers);

    return (
        <div className={styles.CreateTest}>
            <Card className={styles.CreateTestCard}>
                <div className={styles.ChooseType}>
                    {/* <Switch label="Is it a randomised test?"
                            onChange={onChangeIsRandom}
                            large /> */}
                    <Switch label="Is it randomised test?"
                            large
                            onChange={onChangeIsRandom} />
                </div>
                <div className={styles.TestField}>
                    {/* <TestInputField  value={} /> */}
                </div>
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
