import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import useDebounce from "../../customHooks/useDebounce";
import { QuestionToChoose, QuestionChosen } from '../../components/exporter';
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
            questions: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions"
    });

    const [questions, setQuestions] = useState([]);
    const [filter, setFilter] = useState('');
    const [isRandom, setIsRandom] = useState(false);
    const zero = 0;

    const filterQuestions = (event) => {
        console.log(event.currentTarget.value);
        setFilter(event.currentTarget.value);
    };

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

    console.log(questions);

    const removeOneAddOne = (event) => {
        let smallerQuestions = questions;
        console.log(event.currentTarget.value);
        console.log(fields);
        console.log(smallerQuestions);
        let fieldsClone = fields;
        console.log(fieldsClone);
        let modifiedQuestion = fieldsClone.find((question) => question._id === event.currentTarget.id ? true : false );
        console.log("modifiedQuestionId: ", modifiedQuestion);
        smallerQuestions.push(...modifiedQuestion);
        console.log(smallerQuestions);
        setQuestions(smallerQuestions);
    }

    const addOneRemoveOne = (event) => {
        let smallerQuestions = questions;
        console.log(smallerQuestions);
        let modifiedQuestion = smallerQuestions.splice(smallerQuestions.findIndex((question) => question._id === event.currentTarget.id ? true : false ), 1);
        console.log("modifiedQuestionId: ", modifiedQuestion);
        let newFormQuestion = {
            ...modifiedQuestion[0],
            questionValue: modifiedQuestion[0].points
        };
        append({...newFormQuestion});
        console.log(newFormQuestion);
        setQuestions([...smallerQuestions]);
    }

    console.log(isRandom);

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:5001/v1/exams/", {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log(res.data);
            // setQuestions(res.data);
        }).catch(error => {
            console.log(error)
        }) 
    }

    console.log(fields);

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
                            value={isRandom}
                            onClick={() => setIsRandom(!isRandom)}
                            alignIndicator="right" />
                </div>
                <div className={styles.TestField}>
                    <div className={styles.PageDescription}>
                        <h3> The questions you chose </h3>
                        {fields.length === 0 && <h4> Oh no, it is empty </h4> }
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        { isRandom ? <div className={styles.RandomNumbers}>
                            <Label text="Number of questions" /> 
                            <InputGroup type="number" inputRef={register} name="numberOfQuestionsIfRandom" /> 
                         </div> : <> <div>
                            {fields.map((question, index) => <QuestionChosen question={question} removeOneAddOne={removeOneAddOne} index={index} /> )}
                        </div>
                        <div>
                            <Button text="Remove all" 
                                    intent="primary" 
                                    minimal
                                    className={styles.AddMoreButton}
                                    onClick={() => remove()}
                                    />
                        </div> </> }
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
                    { isRandom ? null : <> <div>
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
                    </div> </> }
                </div>
            </Card>
        </div>
    )
}
