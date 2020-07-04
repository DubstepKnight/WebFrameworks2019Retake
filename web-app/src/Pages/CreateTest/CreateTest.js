import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { QuestionToChoose, QuestionChosen, AppToaster } from '../../components/exporter';
import { 
    Card, 
    Button, 
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

    const [chosenQuestions, setChosenQuestions] = useState([]);
    const [nonChosenQuestions, setNonChosenQuestions] = useState([]);
    const [category, setCategory] = useState('');
    const [testName, setTestName] = useState('');
    const [filter, setFilter] = useState('');
    const [isRandom, setIsRandom] = useState(false);
    const [numberOfQuestionsIfRandom, setNumberOfQuestionsIfRandom] = useState();
    const [isPersonal, setIsPersonal] = useState(false);
    const [students, setStudents] = useState();
    const [personalFor, setPersonalFor] = useState();
    const [isPending, setIsPending] = useState(false);

    const filterQuestions = (event) => {
        console.log(event.currentTarget.value);
        setFilter(event.currentTarget.value);
    };

    useEffect(() => {
        axios.post("http://localhost:5001/v1/questions/get", {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.table(res.data);
            setNonChosenQuestions(res.data);
        }).catch(error => {
            console.log(error)
        }) 
        axios.get("http://localhost:5001/v1/users/allStudents", {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.table(res.data);
            let studentsNames = res.data.map(student => {
                return {
                    value: student._id,
                    label: student.username
            }})
            console.log('studentsNames: ', studentsNames);
            setStudents(studentsNames);
        }).catch(error => {
            console.log(error)
        }) 
    }, []);

    console.log(nonChosenQuestions);

    const removeOneAddOne = (event) => {

        let chosenQuestionId = event.currentTarget.id;
        let nonChosenQuestionsClone = nonChosenQuestions;
        let chosenQuestionsClone = chosenQuestions;
        let splicedQuestion = chosenQuestionsClone.splice(chosenQuestionsClone.findIndex(({_id}) => _id === chosenQuestionId ? true : false ), 1);
        let newFormQuestion = {
            ...splicedQuestion[0],
            questionValue: splicedQuestion[0].points
        };
        nonChosenQuestionsClone.push(newFormQuestion);
        setChosenQuestions([...chosenQuestionsClone]);
        setNonChosenQuestions(nonChosenQuestionsClone);
    }

    const addOneRemoveOne = (event) => {
        let chosenQuestionId = event.currentTarget.id;
        let nonChosenQuestionsClone = nonChosenQuestions;
        let chosenQuestionsClone = chosenQuestions;
        let splicedQuestion = nonChosenQuestionsClone.splice(nonChosenQuestionsClone.findIndex(({_id}) => _id === chosenQuestionId ? true : false ), 1);
        let newFormQuestion = {
            ...splicedQuestion[0],
            questionValue: splicedQuestion[0].points
        };
        chosenQuestionsClone.push(newFormQuestion);
        setChosenQuestions(chosenQuestionsClone);
        setNonChosenQuestions([...nonChosenQuestionsClone]);
    }

    console.log(isRandom);

    const submitHandler = () => {
        console.log('chosenQuestions: ', chosenQuestions);
        let createTestSubmitObject = {
            isRandom: isRandom,
            numberOfQuestionsIfRandom: numberOfQuestionsIfRandom,
            personalFor: personalFor,
            name: testName,
            category: category,
            questions: [...chosenQuestions]
        }
        console.log('createTestSubmitObject: ', createTestSubmitObject);
        onSubmit(createTestSubmitObject);
    }

    const onSubmit = (data) => {
        console.log('data: ', data);
        setIsPending(true);
        axios.post("http://localhost:5001/v1/exams/", data, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            setIsPending(false);
            console.log(res.data);
            if (res.data.errors) {
                AppToaster.show({message: 'An error has occured', intent: 'danger'});    
            } else {
                AppToaster.show({message: 'The test was successfully created', intent: 'success'});
            }
        }).catch(error => {
            setIsPending(false);
            AppToaster.show({message: 'An error has occured', intent: 'danger'});
            console.log(error)
        }) 
    }

    console.log('students: ', students);

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
                                    value={testName}
                                    onChange={(event) => setTestName(event.currentTarget.value)}
                                    id="name" />
                    </div>
                    <div className={styles.CategoryInputContainer}>
                        <Label className={styles.TestNameLabel}> Test Category </Label>
                        <InputGroup type="text"
                                    placeholder="The test category"
                                    intent="primary"
                                    large
                                    className={styles.CategoryInput}
                                    value={category}
                                    onChange={(event) => setCategory(event.currentTarget.value)}
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
                     <Switch label="Personal?"
                            large
                            name='isPersonal'
                            // inputRef={register}
                            value={isPersonal}
                            onClick={() => setIsPersonal(!isRandom)}
                            alignIndicator="right" />
                </div>
                <div className={styles.TestField}>
                    <div className={styles.PageDescription}>
                        { isPersonal && <> 
                            <h3> This exam is personal for </h3>
                            <HTMLSelect options={students}
                                        value={personalFor}
                                        onChange={(event) => setPersonalFor(event.currentTarget.value)} />
                        </>                            
                        }
                        <h3> The questions you chose </h3>
                        {chosenQuestions.length === 0 && <h4> Oh no, it is empty </h4> }
                    </div>
                    <form >
                        { isRandom ? <div className={styles.RandomNumbers}>
                            <Label text="Number of questions" /> 
                            <InputGroup type="number" 
                                        inputRef={register} 
                                        value={numberOfQuestionsIfRandom}
                                        onChange={(event) => setNumberOfQuestionsIfRandom(event.currentTarget.value)} /> 
                         </div> : <> <div>
                            {chosenQuestions.map((question, index) => <QuestionChosen question={question} removeOneAddOne={removeOneAddOne} index={index} /> )}
                        </div>
                        <div>
                        </div> </> }
                        <div className={styles.Submit}>
                            <Button text="Cancel"
                                    large
                                    intent="danger"
                            />
                            <Button text="Submit"
                                    loading={isPending}
                                    large 
                                    onClick={submitHandler}
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
                            {nonChosenQuestions.filter(({question}) => question.toLowerCase().includes(filter.toLowerCase())).map((question, key) => <QuestionToChoose question={question}
                                                                                                                                                            addOneRemoveOne={addOneRemoveOne}
                                                                                                                                                            key={key} />)}  
                    </div> </> }
                </div>
            </Card>
        </div>
    )
}
