import React from 'react';
import {Label, InputGroup} from '@blueprintjs/core';
import styles from './TestInputField.module.css';


export const TestInputField = (props) => {



    return (
        <div className={styles.TestInputField}
             id={props.id}>
            <Label text={`question №${props.id}`} />
            <InputGroup placeholder="Write what you have to"
                        className={styles.QuestionInput}
                        intent="primary" 
                        onChange={props.onChangeHandler}
                        type="text"
                        value={props.inputValue} />
        </div>
    )
}
