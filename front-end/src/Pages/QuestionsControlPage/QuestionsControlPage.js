import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import Question from './QuestionCreate/QuestionCreate';
import { Button,
         Card,
         InputGroup,
         Overlay,
         HTMLSelect, 
         Dialog} from '@blueprintjs/core';
import styles from './QuestionsControlPage.module.css';
import axios from 'axios';
import { QuestionToChoose } from '../../components/exporter';
import { QuestionCard } from './QuestionCard/QuestionCard';

export const QuestionsControlPage = (props) => {

    const [filter, setFilter] = useState('');
    const [questions, setQuestions] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('') ;
    const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

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
    }, []);

    const filterInput = (event) => {
        console.log("fucking nothing");
        setFilter(event.currentTarget.value);
    }

    const closeOverlay = () => {
        setIsCreateQuestionOpen(false);
    }

    const onChangeHandler = (event) => {
        console.log(event.currentTarget.value);
        
    }

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
                                placeholder="Find your questions" />
                </div>
                <div>
                    <Button text="Create a Question"
                            intent="success"
                            onClick={() => setIsCreateQuestionOpen(true)} />
                    <Dialog isCloseButtonShown 
                            isOpen={isCreateQuestionOpen}
                            onClose={closeOverlay}
                            canOutsideClickClose
                            canEscapeKeyClose
                            title='Create a question' 
                            // className={styles.CreateQuestionOverlay}
                                >
                        <Question isCreateQuestionOpen={isCreateQuestionOpen}
                                    setIsCreateQuestionOpen={setIsCreateQuestionOpen}
                                    closeOverlay={closeOverlay} />
                    </Dialog>
                </div>
                <div>
                    {
                        questions.map(question => <QuestionCard {...question} /> )
                    }
                </div>
            </Card>
        </div>
    )
}
