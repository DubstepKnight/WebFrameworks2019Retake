import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import {AnswerOptions} from '../../../components/exporter';
import { Button,
    Card,
    InputGroup,
    H3 } from '@blueprintjs/core';
import styles from './QuestionCreate.module.css';
import axios from 'axios';

const Question = (props) => {

    const { register, handleSubmit, control } = useForm({
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
        console.log('props.userInfoAndToken: ', props.userInfoAndToken);
        axios.post('http://localhost:5001/v1/questions', data, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res: ', res);
        }).catch(err => {
            console.log('err: ', err);
        })
    }

    

    return (
        <Card className={styles.QuestionCard}>
            <H3> Question </H3>
            <form onSubmit={handleSubmit(handleCreateQuestion)}>
                <InputGroup placeholder="Question here"
                            inputRef={register}
                            style={{marginBottom: '1rem'}}
                            name="question" />
                <H3> Category </H3>
                <InputGroup placeholder="The question cateogory here"
                            inputRef={register}
                            style={{marginBottom: '1rem'}}
                            name="category" />
                <H3> Options </H3>
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
                            type='submit' />
                </div>
            </form>
        </Card>
    )
}

export default Question;