import React from 'react';
import { InputGroup, Label } from '@blueprintjs/core';
import styles from 'TestInput.module.css';

export const TestInputField = (id, value, onChangeHandler, questionNumber) => {
    return (
        <div className={styles.TestInputField}>
            <Label text={`question №${questionNumber}`} />
            <InputGroup placeholder="Write what you have to"
                        intent="primary" 
                        onChange={onChangeHandler}
                        type="text"
                        value={value} />
        </div>
    )
}
