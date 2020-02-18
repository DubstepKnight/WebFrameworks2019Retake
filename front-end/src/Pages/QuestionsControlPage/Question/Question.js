import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import {AnswerOptions} from '../../../components/exporter';
import { Button,
    Card,
    InputGroup,
    Overlay,
    HTMLSelect } from '@blueprintjs/core';
import styles from './Question.module.css';

const Question = (props) => {

    const { register, getValues, errors, handleSubmit, control } = useForm({
        defaultValues: {
            options: [
                {option: ''}
            ],
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "options"
    });

    const createQuestion = () => {
        console.log("questionCreated");
        props.setIsCreateQuestionOpen(false);
    }

    console.log(props);

    return (
        <Card className={styles.QuestionCard}>
            <h3> Create question </h3>
            <InputGroup placeholder="Question here"
                        inputRef={register}
                            />
            <div>
                <AnswerOptions  append={append}
                                remove={remove}
                                fields={fields}
                                register={register}  />
            </div>
            <div>
                <Button text="Cancel"
                        intent="danger"
                        onClick={props.closeOverlay}
                        minimal />
                <Button text="Create a question"
                        intent="success"
                        onClick={createQuestion}
                        minimal />
            </div>
        </Card>
    )
}

export default Question;