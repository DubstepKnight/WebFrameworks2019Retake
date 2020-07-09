import React, { useState, useEffect } from 'react';
import Question from './QuestionCreate/QuestionCreate';
import { Button,
         Card,
         Spinner,
         Dialog} from '@blueprintjs/core';
import styles from './QuestionsControlPage.module.css';
import axios from 'axios';
import { AppToaster } from '../../components/exporter';
import { QuestionCard } from './QuestionCard/QuestionCard';

export const QuestionsControlPage = (props) => {

    const [questions, setQuestions] = useState([]);
    const [isCreateQuestionOpen, setIsCreateQuestionOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.post("http://localhost:5001/v1/questions/get", {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        } ).then(res => {
            console.table(res.data);
            if ( res.data.errors ) {
                AppToaster.show({ message: "Could not load the questions", intent: 'danger' });
            } else {
                setQuestions(res.data);
            }
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            AppToaster.show({ message: "Could not load the questions", intent: 'danger' });
            console.log(error)
        }) 
    }, []);

    const closeOverlay = () => {
        setIsCreateQuestionOpen(false);
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
                        isLoading ? <Spinner intent='primary' size={50} /> :
                        questions.map(question => <QuestionCard {...question} /> )
                    }
                </div>
            </Card>
        </div>
    )
}
