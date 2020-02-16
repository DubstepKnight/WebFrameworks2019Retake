import React, { useState } from 'react';
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

    // const { register, getValues, watch, handleSubmit, control } = useForm();
    // const [isRandomSubState, setIsRandomSubState] = useState(false);
    // const [questionsState, setQuestionsState] = useState([
    //     {
    //         question0: ''
    //     }
    // ])
    // const [answers, setAnswers] = useState({
    //     name: '',   
    //     category: '',
    //     isRandom: isRandomSubState,
    //     questions: questionsState,
    // });
    // const [inputAmount, setInputAmount] = useState(1);

    // const onChangeIsRandom = () => {
    //     setIsRandomSubState(!isRandomSubState);
    //     setAnswers(prevState => {
    //         return {
    //             ...prevState,
    //             isRandom: isRandomSubState
    //         }
    //     });
    // }

    // const onChangeHandler = event => {
    //     if (event.currentTarget.id.substring(0, 8) === 'question') {
    //         console.log(questionsState);
    //         // console.log("the if statement worked");
    //         const inputId = event.currentTarget.id.substring(8);
    //         // const questionId = event.currentTarget.id;
    //         // console.log(event.currentTarget.id);
    //         // console.log(event.currentTarget.value);
    //         // console.log([...questionsState]);
    //         // let neededQuestionElement = [...questionsState];
    //         // console.log(neededQuestionElement);
    //         // let neededQuestion = neededQuestionElement[inputId][questionId];
    //         // console.log(neededQuestion);
    //         setQuestionsState([
    //             ...questionsState,
    //             // [inputId]: {[event.currentTarget.id]: event.currentTarget.value}
    //             // [neededQuestion]: event.currentTarget.value
    //         ])
    //         setAnswers({
    //             ...answers,
    //             questions: questionsState
    //         })
    //         console.log(questionsState);
    //     } else {
    //         setAnswers({
    //             ...answers,
    //             [event.currentTarget.id]: event.currentTarget.value
    //         })
    //     }
    // }

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

    // const addOne = () => {
    //     setInputAmount(inputAmount + 1);
    //     let moreQuestions = questionsState.push({
    //         [`question${inputAmount}`]: ''
    //     })
    //     // setQuestionsState([...questionsState, {
    //     //     [`question${inputAmount}`]: ''
    //     // }])
    //     setAnswers({
    //         ...answers,
    //         questions: questionsState
    //     })

    // }
    
    // const removeOne = () => {
    //    setInputAmount(inputAmount - 1);
    // }   

    // console.log(props);

    // const example = {
    //     id: "024a",
    //     description: "You had to do only one job!!!",
    //     dueDate: "2017-08-09",
    //     createdAt: "2017-08-05",
    //     status: "active"
    // }

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
                    <div className={styles.SelectCategoryContainer}>
                        <Label className={styles.TestNameLabel}> Test Category </Label>
                        <HTMLSelect className={styles.SelectCategory}
                                    name='category'
                                    elementRef={register} >
                            <option> Physics </option>
                            <option> Chemistry </option>
                            <option> IT </option>
                            <option> Biology </option>
                            <option> Literature </option>
                            <option> Philosophy </option>
                        </HTMLSelect>
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
                                         getValues={getValues}
                                         errors={errors} />
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
                                    // onClick={Cancel}
                                    />
                            <Button text="Submit"
                                    type="submit"
                                    large 
                                    intent="success" 
                                    // onClick={SubmitTest}
                                    />
                        </div>
                    </form>
                    
                </div>
               
            </Card>
        </div>
    )
}
