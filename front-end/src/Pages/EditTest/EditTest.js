import React, { useState, useEffect } from 'react';    
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import { TestInputFields } from '../../components/exporter';
import { 
    Card, 
    Button, 
    Alert, 
    Switch, 
    InputGroup, 
    Label,
    HTMLSelect
} from '@blueprintjs/core';
import styles from './EditTest.module.css';

export default function EditTest(props) {

    const [alert, setAlert] = useState(false);
    const [exam, setExam] = useState([]);

    console.log(props.match.params.id);

    let examId = props.match.params.id;
    const zero = 0;

    console.log("exam: ", exam);

    useEffect(() => {
        axios.get(`http://localhost:5001/v1/exams/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        } ).then(res => {
            console.table(res.data);
            setExam(res.data);
        }).catch(error => {
            console.log(error)
        }) 
    }, [zero]);

    const testData = {
        name: 'asdad',
        category: 'asdasdas',
        isRandom: true,
        questions: [
            {
                question: 'What are you doing bro?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'Who is that guy?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'What is with his hair?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'How are you?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'How do you answer this, huh?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'UwU?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            },
            {
                question: 'Cheemsbumger?',
                answerOptions: [
                    {option: "asd"},
                    {option: "bgas"},
                    {option: "zvb"},
                    {option: "132."},
                ]
            }
        ]
    }

    const { register, getValues, errors, handleSubmit, control } = useForm({
        defaultValues: {
            questions: [...testData.questions],
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    console.log(fields.length);

    const onSubmit = (data) => {
        console.log("Data was submitted");
        console.log(data);
    }

    const cancelTest = () => {
        console.log("cancel");
    }

    const cancelCancel = () => {
        console.log("cancels the cancel");
        setAlert(false);
    }

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
                                    name='name'
                                    inputRef={register}
                                    id="name" />
                    </div>
                </div>
                <div className={styles.ChooseType}>
                        <Switch label="Randomised test?"
                                large
                                name='isRandom'
                                inputRef={register}
                                alignIndicator="right" />
                    </div>
                <div className={styles.TestField}>
                    <div className={styles.PageDescription}>
                         Create the test of your dream 
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <TestInputFields fields={fields}
                                         append={append}
                                         remove={remove}
                                         register={register}
                                         control={control}
                                         getValues={getValues}
                                         errors={errors} />
                        <div className={styles.Submit}>
                            <Button text="Cancel"
                                    large
                                    intent="danger"
                                    onClick={()  => setAlert(!alert)}
                                    />
                            <Alert  isOpen={alert}
                                    cancelButtonText="Cancel"
                                    confirmButtonText="Leave this test"
                                    intent="danger"
                                    onConfirm={cancelTest}
                                    onCancel={cancelCancel} >
                                <p> Are you sure you want to cancel the test? Your changes will not be saved </p>
                            </Alert>
                            <Button text="Submit"
                                    type="submit"
                                    large 
                                    intent="success" 
                                    />
                        </div>
                    </form>
                    <div>
                        <Button icon="plus" 
                                intent="primary" 
                                minimal
                                className={styles.AddMoreButton}
                                onClick={() => append({
                                    question: "",
                                    answerOptions: [
                                        {option: ""},
                                        {option: ""},
                                        {option: ""},
                                        {option: ""}
                                    ]
                                })}
                                 />
                        <Button text="Remove all" 
                                intent="primary" 
                                minimal
                                className={styles.AddMoreButton}
                                onClick={() => remove(0)}
                                 />
                    </div>
                </div>
               
            </Card>
        </div>
    )
}
