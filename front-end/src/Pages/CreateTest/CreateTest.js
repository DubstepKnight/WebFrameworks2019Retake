import React, { useState } from 'react';
import axios from "axios";
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

    

    const SubmitTest = () => {
        console.log("submitted");
        // API request here
        axios.post('http://localhost:5001/v1/exams', {} ).then(res => {
            console.log(res);
            // let token = res.data.userAndToken.token;
            // let userInfo = res.data.userAndToken.user[0];
            // // let rememberMe = 
            // props.loginHandler(userInfo, token, form.rememberMe);
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
