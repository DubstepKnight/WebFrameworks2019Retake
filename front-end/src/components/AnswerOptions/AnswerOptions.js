import React from 'react';
import styles from './AnswerOptions.module.css';
import { InputGroup,
         Button   
} from '@blueprintjs/core';

const AnswerOptions = (props) => {

    console.log(props.fields.length);
    console.log(props.fields);

    const addOne = () => {
        console.log("I add");
        props.append({option: ""});
    }

    // const removeOne = () => {
    //     console.log("I remove");
    //     props.remove(event.);
    // }

    return (
        <div>
            {props.fields.map((option, index) => {
                return (
                    <div key={index}>
                        <InputGroup inputRef={props.register} 
                                    id={index}
                                    name={`options[${index}].option`}
                                    defaultValue={option.option} /> 
                        <Button icon="minus"
                            intent="primary"
                            className={styles.removeOneButton}
                            disabled={props.fields.length <= 1 ? true : false }
                            onClick={() => props.remove(index) }
                            minimal />  
                    </div>     
                )
            })}
            <div className={styles.Buttons}>
                <Button icon="plus"
                        intent="primary"
                        className={styles.addOneButton}
                        onClick={addOne}
                        minimal />       
                
            </div>
        </div>
    )
}

export default AnswerOptions;
