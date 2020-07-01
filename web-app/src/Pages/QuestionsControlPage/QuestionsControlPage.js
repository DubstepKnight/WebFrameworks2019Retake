import React, { useState, useEffect } from 'react';
import Question from './QuestionCreate/QuestionCreate';
import { Button,
         Card,
         Dialog} from '@blueprintjs/core';
import styles from './QuestionsControlPage.module.css';
import axios from 'axios';
import { QuestionCard } from './QuestionCard/QuestionCard';

export const QuestionsControlPage = (props) => {

    const [questions, setQuestions] = useState([]);
    const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);

    useEffect(() => {
        axios.post("http://localhost:5001/v1/questions/get", {
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

    const closeOverlay = () => {
        setIsCreateQuestionOpen(false);
    }

    const onChangeHandler = (event) => {
        console.log(event.currentTarget.value);
        
    }

    return (
        <div className={styles.QuestionsControlPageContainer}>
            <Card className={styles.QuestionsControlPage}>
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
                                    userInfoAndToken={props.userInfoAndToken}
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
