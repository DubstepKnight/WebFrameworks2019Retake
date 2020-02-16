import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import {AnswerOptions} from '../../components/exporter';
import { Button,
         Card,
         InputGroup,
         Overlay,
         HTMLSelect } from '@blueprintjs/core';
import styles from './QuestionsControlPage.module.css';

const testData = [
    {
        question: 'The capital city of the UK',
        answerOptions: [
            'London',
            'Paris',
            'Miami',
            'New York'
        ]
    },
    {
        question: 'Who invented death?',
        answerOptions: [
            'God',
            'Satan',
            'Jews',
            'Kyle Klavits'
        ]
    },
    {
        question: 'THe radius of Earth',
        answerOptions: [
            '6500km',
            '25cm',
            'Tesla',
            '2 football fields'
        ]
    },
    {
        question: 'Will I get 5?',
        answerOptions: [
            'Yes',
            'No',
            'Probably',
            'We will see'
        ]
    }
]

export const QuestionsControlPage = () => {

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

    const [filter, setFilter] = useState('');
    const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

    const filterInput = (event) => {
        console.log("fucking nothing");
        setFilter(event.currentTarget.value);
    }

    const closeOverlay = () => {
        setIsCreateQuestionOpen(false);
    }

    const createQuestion = () => {
        console.log("questionCreated");
        setIsCreateQuestionOpen(false);
    }

    console.log("asdasdasd");

    return (
        <div className={styles.QuestionsControlPageContainer}>
            <Card className={styles.QuestionsControlPage}>
                <div className={styles.SearchField}>
                    <InputGroup onChange={filterInput} 
                                value={filter} 
                                large 
                                intent="primary" 
                                type="search" 
                                className={styles.SearchBar} 
                                placeholder="Find your tests"  />
                </div>
                <div>
                    <div>
                        <HTMLSelect elementRef={register}
                                    minimal
                                     >
                            <option> Mathematics </option>
                            <option> Chemistry </option>
                            <option> Physics </option>
                        </HTMLSelect>
                    </div>
                    <div>
                        <div>
                            <Button text="Create Test"
                                    intent="success"
                                    onClick={() => setIsCreateQuestionOpen(true)} />
                            <Overlay isOpen={isCreateQuestionOpen}
                                     className={styles.CreateQuestionOverlay}
                                     onClose={closeOverlay}
                                     usePortal={true}
                                     canOutsideClickClose={true}
                                      >
                                <Card className={styles.CreateQuestion}>
                                    <h3> Create question </h3>
                                    <InputGroup placeholder="Question here"
                                                inputRef={register}
                                                 />
                                    <div>
                                        <AnswerOptions  append={append}
                                                        remove={remove}
                                                        fields={fields}  />
                                    </div>
                                    <div>
                                        <Button text="Cancel"
                                                intent="danger"
                                                onClick={closeOverlay}
                                                minimal />
                                        <Button text="Create a question"
                                                intent="success"
                                                onClick={createQuestion}
                                                minimal />
                                    </div>
                                </Card>
                            </Overlay>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
