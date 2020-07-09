import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExamQuestion, AppToaster } from '../../components/exporter';
import styles from './TakeTest.module.css';
import { Button, Spinner } from '@blueprintjs/core';
import { useForm } from 'react-hook-form';

export default function TakeTest(props) {

    const [examData, setExamData] = useState();
    const [examName, setExamName] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm();

    let examId;

    useEffect(() => {
        examId = props.match.params.id;

        console.log('props.match.params: ', props.match.params);
        console.log('examId: ', examId);

        console.log('props.userInfoAndToken.token: ', props.userInfoAndToken);
        setIsLoading(true);

        axios.get(`http://localhost:5001/v1/exams/${examId}`, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            console.log('res.data: ', res.data);
            setExamName(res.data.name);
            console.log('questions: ', {questions: [...res.data.questions]});
            axios.post(`http://localhost:5001/v1/questions/get`, 
                { 
                    questions: [...res.data.questions],
                    isRandom: res.data.isRandom,
                    category: res.data.category,
                    numberOfQuestionsIfRandom: res.data.numberOfQuestionsIfRandom
                },
                { headers: { "Authorization": `Bearer ${props.userInfoAndToken.token}`}
            }).then(res => {
                setIsLoading(false);
                setExamData(res.data);
                console.log('res.data: ', res.data);
                if ( res.data.errors ) {
                    AppToaster.show({message: 'Could not load the questions', intent: 'danger'});
                }
            }).catch(err => {
                setIsLoading(false);
                console.log('err: ', err);
                AppToaster.show({message: 'Could not load the questions', intent: 'danger'});
            })
        }).catch(err => {
            setIsLoading(false);
            AppToaster.show({message: 'Could not load the test', intent: 'danger'});
            console.log('err: ', err);
        })   
    }, [])

    const submitter = (data) => {
        console.log('data: ', data);
        let dataToSend = {
            examId: props.match.params.id,
            examName: examName,
            takenExamData: {
                takenBy: {
                    userId: props.userInfoAndToken.userInfo._id,
                    username: props.userInfoAndToken.userInfo.username
                },
                questions: data.questions
            }
        }
        console.log('dataToSend: ', dataToSend);
        axios.post(`http://localhost:5001/v1/exams/take`, dataToSend, {
            headers: {
                "Authorization": `Bearer ${props.userInfoAndToken.token}`
            }
        }).then(res => {
            if ( res.data.errors ) {
                AppToaster.show({message: 'The test was not taken, something wrong has happened', intent: 'danger'});
            } else {
                AppToaster.show({message: 'The test was successfully taken! Yay', intent: 'success'});
            }
        }).catch(err => {
            AppToaster.show({message: 'The test was not taken, something wrong has happened', intent: 'danger'});
            console.log('err: ', err);
        })
    }

    return (
        <div className={styles.TakeTest} >
            <form onSubmit={handleSubmit(submitter)} >
                { examData ? 
                    examData.map((questions, index) => {
                        return <ExamQuestion register={register} {...questions} index={index} key={index} />
                    }) : isLoading ? <Spinner intent='primary' size={50} /> : null
                }
                <div>
                    <Button text='Cancel Test' 
                            intent='danger' 
                            onClick={() => props.history.push('/dashboard')} />
                    <Button text='Submit'
                            intent='success'
                            type='submit'
                            style={{marginLeft: '25px'}}
                            onClick={submitter}
                            />
                </div>
            </form>
        </div>
    )
}
