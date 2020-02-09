import React, { useState } from 'react';
import {TestInputField} from './TestInputField/TestInputField';
import { InputGroup, Label, Button } from '@blueprintjs/core';
import styles from './TestInputFields.module.css';

export const TestInputFields = (props) => {

    const [inputCounter, setInputCounter] = useState(0);

    console.log(props.values);
    console.log(props.numberOfInputs); 
    console.log(props);

    const renderInputs = [];

    for (let i = 0; i < props.numberOfInputs; i++) {
        console.log(i);
        renderInputs.push(<TestInputField id={i} value={props.values[i]} onChangeHandler={props.onChangeHandler} />);            
    }
    // return renderInputs;    
    return (
        <div>
            {renderInputs}
        </div>
    )

    console.log(renderInputs);
}
