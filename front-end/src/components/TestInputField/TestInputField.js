import React, { useState } from 'react';
import { InputGroup, Label, Button } from '@blueprintjs/core';
import styles from './TestInputField.module.css';

export const TestInputField = (id, value, onChangeHandler, questionNumber) => {

    const [inputFields, setInputFields] = useState();

    return (
        <div className={styles.TestInputField}>
            <Label text={`question №${questionNumber}`} />
            <InputGroup placeholder="Write what you have to"
                        intent="primary" 
                        onChange={onChangeHandler}
                        type="text"
                        value={value} />
            <Button icon="plus" 
                    intent="primary" 
                    minimal
                    className={styles.AddMoreButton} />
        </div>
    )
}
