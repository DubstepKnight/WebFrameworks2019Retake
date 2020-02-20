import React, { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import Question from './Question/Question';
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

    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('') ;
    const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

    const filterInput = (event) => {
        console.log("fucking nothing");
        setFilter(event.currentTarget.value);
    }

    const closeOverlay = () => {
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
                                placeholder="Find your tests" />
                </div>
                <div>
                    <div>
                        <HTMLSelect value={categoryFilter}
                                    minimal >
                            <option> Some stuff </option>
                            <option> Some stuff </option>
                            <option> Some stuff </option>
                            {/* {} */}
                        </HTMLSelect>
                    </div>
                    <div>
                        <div>
                            <Button text="Create a Question"
                                    intent="success"
                                    onClick={() => setIsCreateQuestionOpen(true)} />
                            <Overlay isOpen={isCreateQuestionOpen}
                                     className={styles.CreateQuestionOverlay}
                                     onClose={closeOverlay}
                                     usePortal={true}
                                     canOutsideClickClose={true} >
                                <Question isCreateQuestionOpen={isCreateQuestionOpen}
                                          setIsCreateQuestionOpen={setIsCreateQuestionOpen}
                                          closeOverlay={closeOverlay}
                                          className={styles.CreateQuestion} />
                            </Overlay>
                        </div>
                    </div>
                </div>
                <div>
                    Questions will be shown here
                </div>
            </Card>
        </div>
    )
}
