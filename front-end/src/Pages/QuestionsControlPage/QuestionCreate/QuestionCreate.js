import React, { useState, useEffect} from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import {AnswerOptions} from '../../../components/exporter';
import { Button,
    Card,
    InputGroup,
    Overlay,
    HTMLSelect } from '@blueprintjs/core';
import styles from './QuestionCreate.module.css';

const Question = (props) => {

    const { register, getValues, errors, handleSubmit, control } = useForm({
        defaultValues: {
            options: [{option: ''}],
        }
    });
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });

    const handleCreateQuestion = (data) => {
        console.log("questionCreated");
        console.log(data);
        // props.setIsCreateQuestionOpen(false);
    }

    console.log(props);

    return (
        // <div className={styles.QuestionCard} >
        <Card className={styles.QuestionCard}>
            <h3> Create question </h3>
            <form onSubmit={handleSubmit(handleCreateQuestion)}>
                <InputGroup placeholder="Question here"
                            inputRef={register}
                            name="question" />
                <h3> Category </h3>
                <InputGroup placeholder="The question cateogory here"
                            inputRef={register}
                            name="category" />
                <h3> Options </h3>
                <AnswerOptions  append={append}
                                remove={remove}
                                fields={fields}
                                register={register} 
                                />
                <div className={styles.Buttons} >
                    <Button text="Cancel"
                            intent="danger"
                            onClick={props.closeOverlay}
                            minimal />
                    <Button text="Create a question"
                            intent="success"
                            type='submit'
                            // onClick={createQuestion}
                             />
                </div>
            </form>
        </Card>
        // </div>
    )
}

export default Question;