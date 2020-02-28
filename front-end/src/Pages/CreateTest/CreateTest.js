import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import useDebounce from "../../customHooks/useDebounce";
import { QuestionToChoose } from '../../components/exporter';
import { 
    Card, 
    Button, 
    Alert, 
    Switch, 
    InputGroup, 
    Label,
    HTMLSelect
} from '@blueprintjs/core';
import styles from './CreateTest.module.css';

export default function CreateTest(props) {

    const { register, getValues, errors, handleSubmit, control } = useForm({
        defaultValues: {
            questions: [{question: ""}]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('');
    const zero = 0;

    const filterQuestions = (event) => {
        console.log(event.currentTarget.value)
        setFilter(event.currentTarget.value);
    }

    useEffect(() => {
        axios.get("http://localhost:5001/v1/questions/", {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        } ).then(res => {
            console.table(res.data);
            setQuestions(res.data);
        }).catch(error => {
            console.log(error)
        })
    }, [zero]);

    const addOneRemoveOne = (event) => {
        console.log("The question: ", event.currentTarget);
        
        setQuestions();
        // console.log("The question node: ", node.parentNode);
    }

    const SubmitTest = () => {
        console.log("submitted");
        axios.post('http://localhost:5001/v1/exams', {} ).then(res => {
            console.log(res);
            console.log("sent");
        }).catch(err => {
            console.log(err);
            console.log("some");
            return null;
        })
    }

    const Cancel = () => {
        console.log("cancels");
        return(
            <Alert  className={styles.Alert}>
                <p> some stuff </p>
            </Alert>
        )
    }

    const onSubmit = (data) => {
        console.log(data);
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
                    <div className={styles.CategoryInputContainer}>
                        <Label className={styles.TestNameLabel}> Test Category </Label>
                        <InputGroup type="text"
                                    placeholder="The test category"
                                    intent="primary"
                                    large
                                    className={styles.CategoryInput}
                                    name="category"
                                    id="category"
                                    inputRef={register} />
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
                        
                        <div>
                            <Button icon="plus" 
                                    intent="primary"    
                                    minimal
                                    className={styles.AddMoreButton}
                                    onClick={() => append({question: ""})}
                                    />
                            <Button text="Remove all" 
                                    intent="primary" 
                                    minimal
                                    className={styles.AddMoreButton}
                                    onClick={() => remove()}
                                    />
                        </div>
                        <div className={styles.Submit}>
                            <Button text="Cancel"
                                    large
                                    intent="danger"
                            />
                            <Button text="Submit"
                                    type="submit"
                                    large 
                                    intent="success" 
                            />
                        </div>
                    </form>
                    <div>
                        <Label className={styles.TestNameLabel}> Filter questions </Label>
                        <InputGroup type="text"
                                    placeholder="The questions"
                                    intent="primary"
                                    large
                                    className={styles.TestNameInput}
                                    name='filter'
                                    onChange={filterQuestions}
                                    value={filter} />
                    </div>
                    <div className={styles.ChosenQuestionsContainer}>
                        {questions.filter(({question}) => question.toLowerCase().includes(filter.toLowerCase())).map((question, key) => <QuestionToChoose question={question}
                                                                                                                                                          addOneRemoveOne={addOneRemoveOne}
                                                                                                                                                          key={key} />)}  
                    </div>
                </div>
            </Card>
        </div>
    )
}
