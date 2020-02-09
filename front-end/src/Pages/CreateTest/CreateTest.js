import React, { useState } from 'react';
import { TestInputFields } from '../../components/exporter';
import { Card, Button, Alert, Switch, InputGroup, Label } from '@blueprintjs/core';
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
    const [inputAmount, setInputAmount] = useState(10);

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
        setAnswers({
            ...answers,
            [event.currentTarget.id]: event.currentTarget.value
        })
        console.log(event);
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

    const addOne = () => {
        setInputAmount(inputAmount + 1);
    }
    
    const removeOne = () => {
       setInputAmount(inputAmount - 1);
    }   

    console.log(props);
    console.log(answers);

    // const example = {
    //     id: "024a",
    //     description: "You had to do only one job!!!",
    //     dueDate: "2017-08-09",
    //     createdAt: "2017-08-05",
    //     status: "active"
    // }

    return (
        <div className={styles.CreateTest}>
            <Card className={styles.CreateTestCard}>
                <div className={styles.TestHeaderRow}>
                    <div className={styles.TestName}>
                        <Label className={styles.TestNameLabel}> Test Name </Label>
                        <InputGroup type="text"
                                    placeholder="Your test"
                                    intent="primary"
                                    large
                                    className={styles.TestNameInput}
                                    onChange={onChangeHandler}
                                    value={answers.name}
                                    id="name" />
                    </div>
                    <div className={styles.ChooseType}>
                        {/* <Switch label="Is it a randomised test?"
                                onChange={onChangeIsRandom}
                                large /> */}
                        <Switch label="Randomised test?"
                                large
                                onChange={onChangeIsRandom}
                                alignIndicator="right" />
                    </div>
                </div>
                <div className={styles.TestField}>
                    <div> Placeholder over here!!!</div>
                    <TestInputFields values={1235}
                                     numberOfInputs={inputAmount} />
                    <div>
                        <Button icon="plus" 
                                intent="primary" 
                                minimal
                                className={styles.AddMoreButton}
                                onClick={addOne} />
                        <Button icon="minus" 
                                intent="primary" 
                                minimal
                                className={styles.AddMoreButton}
                                onClick={removeOne} />
                    </div>
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
