import React from 'react';
import { Label, 
         InputGroup, 
         Button } from '@blueprintjs/core';
import styles from './TestInputField.module.css';


export const TestInputField = (props) => {

    console.log(props.defaultValue);
    const removeOption = () => {
        console.log(props.id);
        props.remove(props.id);
    }

    return (
        <div className={styles.TestInputField}>
            <Label text={`question №${props.id}`} />
                <InputGroup placeholder={props.id}
                        id={props.id} 
                        className={styles.QuestionInput}
                        intent="primary"
                        inputRef={props.register}
                        name={`questions[${props.id}].question`}
                        type="text"
                        defaultValue={props.defaultValue.question} />
                <div>
                    {props.defaultValue.answerOptions.map((option, index) => {
                        return  (
                            <>
                                <InputGroup  placeholder={`Answer ${index} here`}
                                             intent="primary"
                                             inputRef={props.register}
                                             name={`questions.[${props.id}].answerOptions[${index}].option`}
                                             type="text"
                                             defaultValue={option.option} />
                            </>
                        )
                    })}
                </div>
                <Button onClick={removeOption}
                             minimal
                             intent="primary"
                             icon="minus"
                             className={styles.RemoveButton} />
        </div>
    )
}
